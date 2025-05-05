import React from "react";
import { Link } from "react-router-dom";

const VerticalCards = ({ data, title }) => {
  return (
    <div className="flex flex-wrap w-full items-center justify-center mt-10  overflow-hidden">
      {data.map((c, i) => (
      <Link  to={`/${c.media_type || title}/details/${c.id}`} className="w-[25vh] mr-[5%] mb-[26vh] h-[32vh]  relative" key={i}>
          <img
            className="h-[40vh] object-cover shadow-[8px_17px_38px_2px_rgba(0,0,0,0.5)]"
            src={`https://image.tmdb.org/t/p/original/${
              c.poster_path || c.backdrop_path || c.profile_path
            }`}
            alt=""
          />
          <h1 className="text-2xl text-zinc-400 font-semibold mt-3">
            {(c.original_title || c.title || c.original_name || c.name)
              ?.length > 35
              ? (
                  c.original_title ||
                  c.title ||
                  c.original_name ||
                  c.name
                ).slice(0, 35) + "..."
              : c.original_title || c.title || c.original_name || c.name}
          </h1>
          {c.vote_average && (
            <div className="absolute w-[7vh] right-[10%] bottom-[-21%] h-[7vh] rounded-full bg-yellow-500 flex justify-center items-center">
              {(c.vote_average * 10).toFixed()}%
            </div>
          )}
        </Link>
      ))}
    </div>
  );
};

export default VerticalCards;
