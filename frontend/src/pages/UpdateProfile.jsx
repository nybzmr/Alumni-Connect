import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { userDataContext } from "../store/UserData";
import { useNavigate } from "react-router-dom";
import { APIURL } from "../APIURL";

const UpdateProfile = () => {
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
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    currentInstitution: [""],
    previousInstitutions: [""],
    achievements: [""],
    experience: [""],
  });

  const data = useContext(userDataContext);

  if (!data) {
    return <div>Loading...</div>;
  }

  useEffect(() => {
    // Initialize formData with the current user's data
    setFormData({
      firstName: data.firstName || "",
      lastName: data.lastName || "",
      dob: data.dob || "",
      currentInstitution: data.currentInstitution || [""],
      previousInstitutions: data.previousInstitutions || [""],
      achievements: data.achievements || [""],
      experience: data.experience || [""],
    });
  }, [data]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;

    // Handle input changes and update state
    if (["previousInstitutions", "achievements", "experience"].includes(name)) {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value.split(",").map((item) => item.trim()),
      }));
    } else {
      setFormData((prevData) => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Prepare updatedData by using original values if no changes are made
    const updatedData = {
      firstName: formData.firstName || data.firstName,
      lastName: formData.lastName || data.lastName,
      dob: formData.dob || data.dob,
      currentInstitution:
        formData.currentInstitution.length > 0 &&
        formData.currentInstitution[0] !== ""
          ? formData.currentInstitution
          : data.currentInstitution,
      previousInstitutions:
        formData.previousInstitutions.length > 0 &&
        formData.previousInstitutions[0] !== ""
          ? formData.previousInstitutions
          : data.previousInstitutions,
      achievements:
        formData.achievements.length > 0 && formData.achievements[0] !== ""
          ? formData.achievements
          : data.achievements,
      experience:
        formData.experience.length > 0 && formData.experience[0] !== ""
          ? formData.experience
          : data.experience,
    };

    try {
      const token = getCookie("token");
      const response = await axios.patch(
        `${APIURL}/user/me`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert("Profile updated successfully:");
      navigate("/app/my-profile");
    } catch (error) {
      console.error(
        "Error updating profile:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100 w-[95vw] ">
      <div className="flex flex-col justify-center items-center w-full p-4">
        <form
          className="w-full max-w-lg p-6 bg-white rounded-lg shadow-md"
          onSubmit={handleSubmit}
        >
          <h2 className="text-2xl font-semibold mb-6">Update Profile</h2>

          {/* First Name */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="firstName"
            >
              First Name
            </label>
            <input
              id="firstName"
              name="firstName"
              type="text"
              value={formData.firstName}
              onChange={handleInputChange}
              placeholder="Enter your first name"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Last Name */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="lastName"
            >
              Last Name
            </label>
            <input
              id="lastName"
              name="lastName"
              type="text"
              value={formData.lastName}
              onChange={handleInputChange}
              placeholder="Enter your last name"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Current Institution */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="currentInstitution"
            >
              Current Institution
            </label>
            <input
              id="currentInstitution"
              name="currentInstitution"
              type="text"
              value={formData.currentInstitution} // Show as a comma-separated string
              onChange={handleInputChange}
              placeholder="Enter your current institution"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Previous Institutions */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="previousInstitutions"
            >
              Previous Institutions
            </label>
            <textarea
              id="previousInstitutions"
              name="previousInstitutions"
              value={formData.previousInstitutions.join(", ")} // Show as a comma-separated string
              onChange={handleInputChange}
              placeholder="List your previous institutions"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>

          {/* Achievements */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="achievements"
            >
              Achievements
            </label>
            <textarea
              id="achievements"
              name="achievements"
              value={formData.achievements.join(", ")} // Show as a comma-separated string
              onChange={handleInputChange}
              placeholder="List your achievements"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>

          {/* Experience */}
          <div className="mb-4">
            <label
              className="block text-gray-700 text-sm font-bold mb-2"
              htmlFor="experience"
            >
              Experience
            </label>
            <textarea
              id="experience"
              name="experience"
              value={formData.experience.join(", ")} // Show as a comma-separated string
              onChange={handleInputChange}
              placeholder="List your experience"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end">
            <button
              type="submit"
              className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            >
              Update Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateProfile;
