import { createContext, useState, useEffect } from "react";
import axios from "axios";
import Loader from "../components/Feed/Loader";
import { APIURL } from "../APIURL";

export const userDataContext = createContext();

const UserData = ({ children }) => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Get the token from localStorage or any other way to authenticate
        const token = localStorage.getItem('token');

        // Replace with the actual user ID or endpoint to get user info
        const response = await axios.get(`${APIURL}/user/me`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setUserData(response.data);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching user data:", error);
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  if (loading) {
    return <div><Loader/></div>; // You can replace this with a spinner or skeleton
  }

  return (
    <userDataContext.Provider value={userData}>
      {children}
    </userDataContext.Provider>
  );
};

export default UserData;
