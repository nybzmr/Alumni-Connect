import React from "react";
import { Link } from "react-router-dom";

const Sidebar = () => {
  return (
    <aside className="flex flex-col items-center w-16 h-screen py-8 overflow-y-auto bg-white border-r rtl:border-l rtl:border-r-0 ">
      <nav className="flex flex-col flex-1 space-y-6">
        <Link
          to={"/"}
          className="p-1.5 text-gray-700 focus:outline-none transition-colors duration-200 rounded-lg  hover:bg-gray-100"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth="1.5"
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M2.25 12l8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25"
            />
          </svg>
        </Link>

        <Link
          to={"/create-post"}
          className="p-1.5 text-gray-700 focus:outline-none transition-colors duration-200 rounded-lg  hover:bg-gray-100"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="w-6 h-6"
            viewBox="0 0 16 16"
          >
            <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2z" />
            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4" />
          </svg>
        </Link>
      </nav>

      <div className="flex flex-col space-y-6">
        <Link
          to={'/my-profile'}
          className="p-1.5 text-gray-700 focus:outline-none transition-colors duration-200 rounded-lg  hover:bg-gray-100"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            id="Layer_1"
            data-name="Layer 1"
            viewBox="0 0 24 24"
            width="32"
            height="32"
            className="w-6 h-8"
          >
            <path d="M19.5,2H4.5C2.02,2,0,4.02,0,6.5v11c0,2.48,2.02,4.5,4.5,4.5h15c2.48,0,4.5-2.02,4.5-4.5V6.5c0-2.48-2.02-4.5-4.5-4.5ZM7.1,21c.46-2.32,2.48-4,4.9-4s4.44,1.68,4.9,4H7.1Zm15.9-3.5c0,1.93-1.57,3.5-3.5,3.5h-1.58c-.48-2.88-2.95-5-5.92-5s-5.44,2.12-5.92,5h-1.58c-1.93,0-3.5-1.57-3.5-3.5V6.5c0-1.93,1.57-3.5,3.5-3.5h15c1.93,0,3.5,1.57,3.5,3.5v11ZM12,6c-2.21,0-4,1.79-4,4s1.79,4,4,4,4-1.79,4-4-1.79-4-4-4Zm0,7c-1.65,0-3-1.35-3-3s1.35-3,3-3,3,1.35,3,3-1.35,3-3,3Z" />
          </svg>
        </Link>
      </div>
    </aside>
  );
};

export default Sidebar;
