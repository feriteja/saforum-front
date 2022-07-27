import React from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <div className=" bg-secondary py-4 mt-auto ">
      <div className=" ">
        <ul className="flex  flex-col border-b md:flex-row items-center  justify-center text-center  space-x-4 font-bold">
          <li className="cursor-pointer">
            <Link to={"/privacy-policy"}>Privacy Policy</Link>
          </li>
          <li className="cursor-pointer">
            <Link to={"/dmca"}>DMCA</Link>
          </li>
          <li className="cursor-pointer">
            <Link to={"/term-of-services"}>Terms of Service</Link>
          </li>
          <li className="cursor-pointer">Contact Me</li>
        </ul>
      </div>
      <div className="h-24 text-center space-y-2 ">
        <h1 className="text-3xl font-bold">Mangando</h1>
        <p className="">
          Semua komik di website ini hanya preview dari komik aslinya, mungkin
          terdapat banyak kesalahan bahasa, nama tokoh, dan alur cerita. Untuk
          versi aslinya, silahkan beli komiknya jika tersedia di kotamu.
        </p>
        <p>
          Powered by <strong className="text-lg">komikindo.id</strong>
        </p>
      </div>
    </div>
  );
};

export default Footer;
