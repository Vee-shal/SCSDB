import React from "react";
import { Link } from "react-router-dom";

const Sidenav = () => {
  return (
    <div className="w-[20%] h-full border-r-2 border-zinc-400 p-10 fixed">
      <h1 className="font-semibold text-2xl text-white flex">
        <i className="text-[#6556cd] ri-tv-fill mr-2"></i>
        <span>SCSDB</span>
      </h1>
      <nav className="flex flex-col text-zinc-400 text-xl gap-[1.4vh] mb-3">
        <h1 className="font-medium text-xl text-white mt-10 mb-5">New Feeds</h1>
        <Link to={"/trending"} className="hover:text-white hover:bg-[#6556cd] duration-300 rounded-lg p-3 text-lg">
          <i className="ri-fire-fill mr-2"></i>Trending
        </Link>
        <Link to={"/popular"} className="hover:text-white hover:bg-[#6556cd] duration-300 rounded-lg p-3 text-lg">
          <i className="ri-bard-fill mr-2"></i>Popular
        </Link>
        <Link to={"/movies"} className="hover:text-white hover:bg-[#6556cd] duration-300 rounded-lg p-3 text-lg">
          <i className="ri-movie-2-ai-line mr-2"></i>Movies
        </Link>
        <Link to={"/tv"} className="hover:text-white hover:bg-[#6556cd] duration-300 rounded-lg p-3 text-lg">
          <i className="ri-tv-2-fill mr-2"></i>Tv shows
        </Link>
        <Link to={"/person"} className="hover:text-white hover:bg-[#6556cd] duration-300 rounded-lg p-3 text-lg">
          <i className="ri-group-fill mr-2"></i>Celebs
        </Link>
      </nav>
      <hr className="bg-zinc-400 h-[1px] border-none" />
      <nav className="flex flex-col text-zinc-400 text-xl mt-[-3]">
        <h1 className="font-medium text-xl text-white mt-10 mb-5">
          Website Information
        </h1>
        <Link className="hover:text-white hover:bg-[#6556cd] duration-300 rounded-lg p-3 text-lg">
          <i className="ri-information-line mr-2"></i>About SCSDB
        </Link>
        <Link className="hover:text-white hover:bg-[#6556cd] duration-300 rounded-lg p-3 text-lg">
          <i className="ri-customer-service-line mr-2"></i>Contact Us
        </Link>
      </nav>
    </div>
  );
};

export default Sidenav;
