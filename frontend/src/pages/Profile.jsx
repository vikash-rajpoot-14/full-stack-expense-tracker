import React from "react";
import { Link } from "react-router-dom";
import { FaGithub } from "react-icons/fa";
import { CiGlobe } from "react-icons/ci";

function Profile() {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex justify-between items-center p-4 border-b-2">
        <i>Winner never quit Quitter never wins!!</i>
        <i className="w-96 bg-amber-800 text-white rounded-md px-2">
          Your Profile is <i className="font-semibold">64%</i> completed. A
          complete profile has higher chances of landing a job .  
          <Link to={"/profile"} className="mx-2 text-blue-500">
             complete now
          </Link>
        </i>
      </div>
      <div className="w-[80vw] self-end m-2">
        <div className="mx-4 flex p-4 justify-between items-center">
          <h2 className="font-semibold text-lg">Contact Details</h2>
          <button className="bg- p-1 px-2 text-orange-900 border-2 border-orange-800 rounded-md">Cancel</button>
        </div>
        <form className="text-center">
          <div className="flex justify-center gap-16 p-2 items-center">
            <div className="flex gap-2 items-center">
              <FaGithub />
              <div className="flex w-auto">
                <label htmlFor="name">Full Name:</label>
                <input id="name" type="text" className="ml-12 border-2 w-96" />
              </div>
            </div>
            <div className="flex gap-2 justify-center items-center">
              <CiGlobe />
              <div className="flex  w-auto">
                <label htmlFor="image">Profile Photo URL:</label>
                <input id="image" type="text"className="ml-12 border-2 w-96"  />
              </div>
            </div>
          </div>
          <div className="relative right-[36vw]">
            <button className="bg-orange-800 text-white  p-1 px-2 rounded-md" type="submit">
              Update
            </button>
          </div>
          <p className="border-b-2 m-2 "></p>
        </form>
      </div>
    </div>
  );
}

export default Profile;
