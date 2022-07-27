import React from "react";
import Profile from "../../assets/avatar/Profile.jpg";
import {
  express,
  github,
  instagram,
  linkedin,
  postgresql,
  postman,
  react,
  tailwindcss,
} from "../../assets";

const About = () => {
  return (
    <div className="py-4">
      <div className="bg-primary px-3 py-4 space-y-5 ">
        <div className="flex space-x-3">
          <img
            src={Profile}
            alt="profile"
            className="h-60 w-48 sm:w-52 md:w-56 rounded "
          />
          <div className="">
            <h1 className="font-bold text-3xl">Feri Teja Kusuma</h1>
            <h1 className="font-semibold">WGS Bootcamp batch 2</h1>
            <h1 className="">Pangalengan, Bandung</h1>
            <div className="flex justify-evenly mt-5  space-x-3  ">
              <a href="https://github.com/feriteja" target={"_blank"}>
                <img src={github} className="w-10" alt="github" />
              </a>
              <a href="https://www.instagram.com/feri_teja/" target={"_blank"}>
                <img src={instagram} className="w-10" alt="instagram" />
              </a>
              <a
                href="https://www.linkedin.com/in/feri-teja-kusuma-827545122/"
                target={"_blank"}
              >
                <img src={linkedin} className="w-10" alt="linkedin" />
              </a>
            </div>
          </div>
        </div>
        <div>
          <h1 className="text-center font-bold text-5xl">SaForum</h1>
          <p className="text-center">Forum asik untuk berbagi cerita</p>
        </div>
        <div className=" grid grid-cols-12">
          <div className="col-span-6 md:col-span-4 flex items-center justify-center ">
            <img src={express} alt="express" className="w-40" />
          </div>
          <div className="col-span-6 md:col-span-4 flex items-center justify-center  ">
            <img src={postman} alt="postman" className="w-40" />
          </div>
          <div className="col-span-6 md:col-span-4 flex items-center justify-center  ">
            <img src={react} alt="react" className="w-40" />
          </div>
          <div className="col-span-6 md:col-span-4 flex items-center justify-center  ">
            <img src={postgresql} alt="postgresql" className="w-40" />
          </div>
          <div className="col-span-6 md:col-span-4 flex items-center justify-center  ">
            <img src={tailwindcss} alt="tailwindcss" className="w-40" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
