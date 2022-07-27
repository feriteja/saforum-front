import React from "react";
import ForumPopularCard from "../cards/ForumPopularCard";
import SkeletonSideCard from "../skeleton/SkeletonSideCard";

const sidebar = () => {
  return (
    <div className="space-y-3 w-full ">
      <ForumPopularCard />
      <SkeletonSideCard />
      <SkeletonSideCard number={4} />
      <SkeletonSideCard number={7} />
      <SkeletonSideCard number={3} />
    </div>
  );
};

export default sidebar;
