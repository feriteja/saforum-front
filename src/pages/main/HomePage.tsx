import React from "react";
import { ListForum, PostCard } from "../../components";

const HomePage = () => {
  return (
    <div className="grid md:grid-cols-9 gap-3 p-2 ">
      <div className="min-h-screen col-span-6 space-y-4">
        <PostCard />
        <ListForum />
      </div>
      <div className="bg-secondary min-h-screen col-span-3 ">sidebar</div>
    </div>
  );
};

export default HomePage;
