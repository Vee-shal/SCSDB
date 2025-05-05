import React from "react";
import { Link } from "react-router-dom";

const Header = ({ data }) => {
  return (
    <div
      style={{
        background: `linear-gradient(rgba(0,0,0,0.2),rgba(0,0,0,0.5),rgba(0,0,0,8)),url(https://image.tmdb.org/t/p/original/${
          data.backdrop_path || data.profile_path
        })`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
      className="w-full h-[55vh] text-white flex flex-col justify-end p-[5%]"
    >
      <h1 className="text-4xl w-[70%]  font-black ">
        {` ${
          data.orignal_title || data.title || data.orignal_name || data.name
        }`}{" "}
      </h1>
      <p className="w-[70%] mt-2 mb-2">
        {data.overview.slice(0, 200)}
        <Link to={`/${data.media_type}/details/${data.id}`} className="text-blue-400">...more</Link>
      </p>
      <p className="text-white flex gap-x-1">
        <i className=" ri-megaphone-fill text-yellow-500  font-sans"></i>
        {data.release_date || "No information"}
        <i className=" ri-movie-2-line text-yellow-500 ml-5 font-sans"></i>
        {data.media_type.toUpperCase()}
      </p>
      <Link to={`${data.media_type}/details/${data.id}/trailer`} className="rounded bg-[#6556cd] max-w-fit p-3 mt-6">
        Watch Trailer
      </Link>
    </div>
  );
};

export default Header;
