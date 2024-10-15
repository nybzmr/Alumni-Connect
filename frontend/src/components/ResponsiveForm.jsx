import React, { useState, useContext } from "react";
import axios from "axios";
import { PostDataContext } from "../store/PostData";
import { userDataContext } from "../store/UserData";
import { useNavigate } from "react-router-dom";
import { APIURL } from "../APIURL";

const ResponsiveForm = () => {
  function setCookie(name, value, days) {
    let expires = '';
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
  }
  
  function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }
  function deleteCookie(name) {
    document.cookie = name + '=; Max-Age=-99999999;';
  }
  const { data, setData } = useContext(PostDataContext);
  const { userId, userName } = useContext(userDataContext);
  const navigate = useNavigate()
  // Local state for form inputs
  const [formData, setFormData] = useState({
    title: "",
    body: "",
    tags: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      // Get token from cookie
      const token = getCookie("token");

      // Send post request to backend
      const response = await axios.post(
        `${APIURL}posts/create`,
        {
          title: formData.title,
          body: formData.body,
          tags: formData.tags.split(",").map((tag) => tag.trim()),
          userId: userId, // From context
          userName: userName, // From context
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Show success message
      alert("Post created successfully!");
      navigate('/app/home')


      // Optionally update local context state if you want to show the new post in the frontend immediately
      // const newPost = {
      //   ...response.data, // If the API returns the new post data
      //   reactions: { likes: 0, dislikes: 0 },
      //   views: 0,
      // };
      // setData([...data, newPost]);

      // Reset form fields
      setFormData({
        title: "",
        body: "",
        tags: "",
      });
    } catch (error) {
      console.error("Error creating post:", error);
    }
  };

  return (
    <div className="bg-white rounded shadow-lg p-4 px-4 md:p-8 mb-6 lg:h-[90vh] w-[95vw]">
      <form onSubmit={handleSubmit}>
        <div className="grid gap-4 gap-y-2 text-sm grid-cols-1 lg:grid-cols-3">
          <div className="text-gray-600">
            <p className="font-medium text-lg">Share what's on your mind</p>
          </div>

          <div className="lg:col-span-2">
            <div className="grid gap-4 gap-y-2 text-sm grid-cols-1">
              <div className="md:col-span-5">
                <label htmlFor="title">Title</label>
                <input
                  type="text"
                  name="title"
                  id="title"
                  placeholder="Describe your post in short"
                  className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                  value={formData.title}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="md:col-span-5">
                <label htmlFor="body">Content</label>
                <textarea
                  name="body"
                  id="body"
                  placeholder="Your post goes here"
                  className="h-[200px] border mt-1 rounded px-4 w-full bg-gray-50"
                  value={formData.body}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="md:col-span-5">
                <label htmlFor="tags">Tags (comma separated)</label>
                <input
                  type="text"
                  name="tags"
                  id="tags"
                  placeholder="e.g., history, american, crime"
                  className="h-10 border mt-1 rounded px-4 w-full bg-gray-50"
                  value={formData.tags}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="md:col-span-5 text-right">
                <button
                  type="submit"
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Submit
                </button>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ResponsiveForm;
