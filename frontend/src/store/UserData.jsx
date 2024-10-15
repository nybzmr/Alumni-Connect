import { createContext, useState, useEffect } from "react";
import axios from "axios";
import Loader from "../components/Feed/Loader";
import { APIURL } from "../APIURL";

export const userDataContext = createContext();

const UserData = ({ children }) => {
  const [userData, setUserData] = useState({});
  const [loading, setLoading] = useState(true);
  function setCookie(name, value, days) {
    let expires = "";
    if (days) {
      const date = new Date();
      date.setTime(date.getTime() + days * 24 * 60 * 60 * 1000);
      expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
  }

  function getCookie(name) {
    const nameEQ = name + "=";
    const ca = document.cookie.split(";");
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === " ") c = c.substring(1, c.length);
      if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
  }
  function deleteCookie(name) {
    document.cookie = name + "=; Max-Age=-99999999;";
  }

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        // Get the token from cookie or any other way to authenticate
        const token = getCookie("token");
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
    return (
      <div>
        <Loader />
      </div>
    ); // You can replace this with a spinner or skeleton
  }

  return (
    <userDataContext.Provider value={userData}>
      {children}
    </userDataContext.Provider>
  );
};

export default UserData;
