import React, { useContext, useState, useEffect } from "react";
import { userDataContext } from "../store/UserData";
import axios from "axios";
import Loader from "../components/Feed/Loader";
import Card from "../components/Feed/Card";
import { Link } from "react-router-dom";
import { APIURL } from "../APIURL";

const ProfilePage = () => {
  const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };

  const userData = useContext(userDataContext);
  const [loading, setLoading] = useState(true);
  const [myPostsData, setMyPostsData] = useState([]);
  const [userProfileData, setUserProfileData] = useState(null);

  const deletePost = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.delete(`${APIURL}/posts/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 200) {
        setMyPostsData((prevPosts) =>
          prevPosts.filter((post) => post._id !== id)
        );
      }
    } catch (error) {
      console.error("Error deleting the post:", error);
    }
  };

  useEffect(() => {
    const fetchMyPosts = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${APIURL}/posts/my-posts`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setMyPostsData(response.data);
      } catch (error) {
        console.error("Error fetching user posts:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchMyPosts();
  }, []);

  useEffect(() => {
   setUserProfileData(userData)
  }, [userData]);

  if (!userProfileData) {
    return <div>Loading...</div>;
  }

  return (
    <div className="py-8 w-[95vw]">
      <div className="grid grid-cols-4 sm:grid-cols-12 gap-6 px-4">
        <div className="col-span-4 sm:col-span-3">
          <div className="bg-white shadow rounded-lg p-6">
            <div className="flex flex-col items-center">
              <img
                src="default-profile.jpg"
                className="w-32 h-32 bg-gray-300 rounded-full mb-4 shrink-0"
                alt="Profile"
              />
              <h1 className="text-2xl font-bold">
                {capitalize(userProfileData.firstName)} {capitalize(userProfileData.lastName)}
              </h1>
              <p className="text-gray-700">
                {userProfileData.currentInstitution.length > 0 ? (
                  userProfileData.currentInstitution.map((item, index) => <span key={index}>{item}</span>)
                ) : (
                  <span>NO CURRENT INSTITUTIONS</span>
                )}
              </p>
              <div className="my-6 flex flex-wrap gap-4 justify-center">
                <Link
                  to={'/app/update-profile'}
                  className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
                >
                  Update About
                </Link>
              </div>
            </div>
            <hr className="border-t border-gray-300" />
            <div className="flex flex-col">
              <span className="text-gray-700 uppercase font-bold tracking-wider my-3 text-xl">
                Previous Institutions
              </span>
              <ul>
                {userProfileData.previousInstitutions.length > 0 ? (
                  userProfileData.previousInstitutions.map((item, index) => (
                    <li key={index} className="mb-2">{item}</li>
                  ))
                ) : (
                  <p className="text-gray-500 font-semibold mb-3">
                    None as of now
                  </p>
                )}
              </ul>
              <hr />
              <span className="text-gray-700 uppercase font-bold tracking-wider mb-2 text-xl">
                Achievements
              </span>
              <ul>
                {userProfileData.achievements.length > 0 ? (
                  userProfileData.achievements.map((item, index) => <li key={index} className="mb-2">{item}</li>)
                ) : (
                  <p className="text-gray-500 font-semibold mb-3">
                    None as of now
                  </p>
                )}
              </ul>
            </div>
          </div>
        </div>

        <div className="col-span-4 sm:col-span-9">
          <div className="bg-white shadow rounded-lg px-6 py-4">
            <h2 className="text-xl font-bold mb-4">About Me</h2>
            <p className="text-gray-700">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
              finibus est vitae tortor ullamcorper, ut vestibulum velit
              convallis. Aenean posuere risus non velit egestas suscipit. Nunc
              finibus vel ante id euismod. Vestibulum ante ipsum primis in
              faucibus orci luctus et ultrices posuere cubilia Curae; Aliquam
              erat volutpat. Nulla vulputate pharetra tellus, in luctus risus
              rhoncus id.
            </p>

            <div className="flex justify-center items-center gap-6 my-6">
              {/* Social Links */}
              <a
                className="text-gray-700 hover:text-orange-600"
                aria-label="Visit LinkedIn"
                href="#"
                target="_blank"
                rel="noreferrer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 448 512"
                  className="h-6"
                >
                  <path
                    fill="currentColor"
                    d="M100.28 448H7.4V148.9h92.88zM53.79 108.1C24.09 108.1 0 83.5 0 53.8a53.79 53.79 0 0 1 107.58 0c0 29.7-24.1 54.3-53.79 54.3zM447.9 448h-92.68V302.4c0-34.7-.7-79.2-48.29-79.2-48.29 0-55.69 37.7-55.69 76.7V448h-92.78V148.9h89.08v40.8h1.3c12.4-23.5 42.69-48.3 87.88-48.3 94 0 111.28 61.9 111.28 142.3V448z"
                  />
                </svg>
              </a>

              <a
                className="text-gray-700 hover:text-orange-600"
                aria-label="Visit YouTube"
                href="#"
                target="_blank"
                rel="noreferrer"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 576 512"
                  className="h-6"
                >
                  <path
                    fill="currentColor"
                    d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z"
                  />
                </svg>
              </a>

              {/* Add more social icons as needed */}
            </div>

            {/* Experience */}
            <h2 className="text-xl font-bold mt-6 mb-4">Experience</h2>
            <div className="mb-6">
              <div className="flex justify-between flex-wrap gap-2 w-full">
                <span className="text-gray-700 font-bold">{userProfileData.experience.map((item, index) => <p key={index}>{item}</p>)}</span>
                <p>
                  <span className="text-gray-700 mr-2">at ABC Company</span>
                  <span className="text-gray-700">2017 - 2019</span>
                </p>
              </div>
            </div>
          </div>
          <div className="overflow-y-auto lg:max-h-[40vh] h-auto lg:p-4 lg:px-6 lg:my-4 shadow rounded-lg hidden lg:block">
            <h2 className="text-xl font-bold mt-6 mb-4">My Posts</h2>
            {loading ? (
              <Loader />
            ) : myPostsData.length > 0 ? (
              myPostsData.map((item, index) => (
                <div key={index} className="flex justify-between items-center">
                  <div className="p-10">
                    <Card item={item} />
                  </div>
                  <button
                    className="h-10 w-16 rounded bg-red-500 text-white"
                    onClick={() => deletePost(item._id)}
                  >
                    Delete
                  </button>
                </div>
              ))
            ) : (
              <p className="text-gray-500 font-semibold mb-3">
                No posts available
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
