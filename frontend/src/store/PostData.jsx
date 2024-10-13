import React, { createContext, useState, useEffect } from "react";
import { APIURL } from "../APIURL";


export const PostDataContext = createContext();


export const PostDataProvider = ({ children }) => {
  const [data, setData] = useState([]);
  const [fetched, setFetched] = useState(false);
  const [dataLength, setDataLength] = useState(0);

  useEffect(() => {
    fetch(`${APIURL}/posts/feed`)
      .then((res) => res.json())
      .then((res) => {
        setFetched(true);
        setData(res);
        setDataLength(res.length);
      })
      .catch((error) => {
        setFetched(false);
        console.error("Error fetching data:", error);
      });
  }, []);
  
  return (
    <PostDataContext.Provider value={{ data, setData,fetched, dataLength }}>
      {children}
    </PostDataContext.Provider>
  );
};
