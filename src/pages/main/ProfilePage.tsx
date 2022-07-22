import React from "react";
import { BsGear } from "react-icons/bs";
import { UserState } from "../../context/UserContext";
import avatar from "../../assets/avatar/avataaars.png";

const Profile = () => {
  const { user } = UserState();
  const joinDate = new Date(user?.created_at?.toString().slice(0, 10) || "");

  console.log(joinDate);

  return (
    <div className="min-h-screen">
      <div className="mx-2">
        <div className="flex items-center">
          <img src={avatar} alt="avatar" className="w-24 mx-2" />
          <div>
            <h1 className="font-semibold">{user?.username}</h1>
            <h2 className="text-gray-400">{user?.uuid}</h2>
          </div>
          <div className="self-start mt-4">
            <BsGear size={20} className="sm:hidden" />
          </div>
        </div>
        <p>Joined {joinDate.toLocaleDateString("id-ID")} </p>
      </div>
      <div></div>
    </div>
  );
};

export default Profile;
