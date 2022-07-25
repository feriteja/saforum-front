import React from "react";
import { useParams } from "react-router-dom";

const ProfileActivity = () => {
  const { username } = useParams();

  return <div>ProfileActivity</div>;
};

export default ProfileActivity;
