import React from "react";
import { Link } from "react-router-dom";

const HorizontalCards = ({ data ,category }) => {
  console.log(data)
  return (
    <div className="w-[100%] flex overflow-y-hidden mb-5 p-5">
      {data.length > 0 ? (
        data.map((d, i) => (
          console.log(d),
          <Link
            key={i}
            to={`/${d.media_type ?d.media_type : category}/details/${d.id}`}
            className="min-w-[20%] h-full mr-5 "
          >
            <img
              className="w-full h-35 object-cover"
              src={ d.backdrop_path || d.poster_path ?
                `https://image.tmdb.org/t/p/original/${
                d.backdrop_path || d.poster_path 
              }`
              :"/noImage.jpg"
            } 
              alt=""
            />
            <h1 className="text-xl text-zinc-400  font-bold">
              {` ${d.orignal_title || d.title || d.orignal_name || d.name}`}{" "}
            </h1>
      
          </Link>
        ))
      ) : (
        <h1 className="text-3xl text-white font-black">Nothing To Show</h1>
      )}
    </div>
  );
};

export default HorizontalCards;
