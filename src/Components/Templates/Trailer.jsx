import React from "react";
import ReactPlayer from "react-player";
import { useSelector } from "react-redux";
import { useLocation, useNavigate } from "react-router-dom";
import NotFound from "../NotFound";

const Trailer = () => {
  const { pathname } = useLocation();
  const category = pathname.includes("movie") ? "movie" : "tv";
  const ytVideo = useSelector((state) => state[category].info.videos);
  const navigate = useNavigate();
  return ytVideo ? (
    <div className="fixed inset bg-[rgba(0,0,0,0.88)] z-[100] text-white top-0 left-0 w-screen h-full flex items-center justify-center">
      {/* Close Icon Positioned at Top-Right */}
      <i
        onClick={() => navigate(-1)}
        className="absolute top-5 right-5 text-5xl hover:text-[#6556cd] ri-close-fill cursor-pointer"
      />

      {/* YouTube Video Player */}
      <ReactPlayer
      muted={true}
        width="50vw"
        controls={true}
        height="28.125vw" /* 16:9 aspect ratio */
        url={`https://www.youtube.com/watch?v=${ytVideo.key}`}
      />
    </div>
  ) : (
    <NotFound />
  );
};

export default Trailer;
