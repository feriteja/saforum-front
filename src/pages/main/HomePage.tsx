import React from "react";
import { PostCard } from "../../components";

const HomePage = () => {
  return (
    <div className="grid md:grid-cols-9 gap-3 p-2 ">
      <div className="min-h-screen   col-span-6">
        <PostCard />
      </div>
      <div className="bg-green-300 min-h-screen col-span-3 ">sidebar</div>
    </div>
  );
};

export default HomePage;
