import React, { useContext } from 'react';
import { userDataContext } from '../store/UserData';
import { Link } from 'react-router-dom';
const ProfileCard = () => {
  const capitalize = (str) => {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };
  
  const userData = useContext(userDataContext)

  const { firstName , lastName , currentInstitution,previousInstitutions, achievements} = userData
  return (
    // <div className="w-[] max-w-md px-8 py-4 mt-16 bg-white rounded-lg shadow-lg">
    //   <div className="flex justify-center -mt-16 md:justify-end">
    //     <img
    //       className="object-cover w-20 h-20 border-2 border-blue-500 rounded-full"
    //       alt="Testimonial avatar"
    //       src="default-profile.jpg"
    //     />
    //   </div>

    //   <h2 className="mt-2 text-xl font-semibold text-gray-800 md:mt-0">My Profile</h2>

    //   <p className="mt-2 text-sm text-gray-600">
    //     Lorem ipsum dolor sit amet consectetur adipisicing elit. Quae dolores deserunt ea doloremque natus error, rerum quas odio quaerat nam ex commodi hic, suscipit in a veritatis pariatur minus consequuntur!
    //   </p>

    //   <div className="flex justify-end mt-4">
    //     <Link to={'/my-profile'} className="text-lg font-medium text-blue-600" tabIndex="0" role="link">
    //        {`${firstName} ${lastName}`}
    //     </Link>
    //   </div>
    // </div>
    <div className="bg-white shadow rounded-lg p-6">
            <div className="flex flex-col items-center">
              <img
                src="default-profile.jpg"
                className="w-32 h-32 bg-gray-300 rounded-full mb-4 shrink-0"
                alt="Profile"
              />
              <Link to={'/my-profile'} className="text-2xl font-bold text-blue-500">
                {capitalize(firstName)} {capitalize(lastName)}
              </Link>
              <p className="text-gray-700">
                {currentInstitution.length > 0 ? (
                  currentInstitution.map((item,index) => <span key={index} >{item}</span>)
                ) : (
                  <span>NO CURRENT INSTITUTIONS</span>
                )}
              </p>
              
            </div>
            <hr className="border-t border-gray-300" />
            <div className="flex flex-col">
              <span className="text-gray-700 uppercase font-bold tracking-wider my-3 text-xl">
                Previous Istitutions
              </span>
              <ul>
                {previousInstitutions.length > 0 ? (
                  previousInstitutions.map((item,index) => (
                    <li key={index} className="mb-2">{item}</li>
                  ))
                ) : (
                  <span className="text-gray-500 font-semibold mb-3">
                    None as of now
                  </span>
                )}
              </ul>
              <hr />
              <span className="text-gray-700 uppercase font-bold tracking-wider mb-2 text-xl">
                Achievements
              </span>
              <ul>
                {achievements.length > 0 ? (
                  achievements.map((item,index) => <li key={index} className="mb-2">{item}</li>)
                ) : (
                  <p className="text-gray-500 font-semibold mb-3">
                    None as of now
                  </p>
                )}
              </ul>
            </div>
          </div>
  );
};

export default ProfileCard;
