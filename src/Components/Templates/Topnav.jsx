import axios from "../../utils/axios";
import React, { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import noImage from '/public/noImage.jpg'
const Topnav = () => {
  const [query, setQuery] = useState("");
  const [searches, setsearches] = useState(null);
  const getSearches = async () => {
    try {
      const { data } = await axios.get(`search/multi?query=${query}`);
      setsearches(data.results);
    } catch (error) {
      console.log("error: ", error);
    }
  };
  useEffect(() => {
    getSearches();
  }, [query]);

  return (
    <div className=" w-full h-[10vh] relative flex justify-start ml-[15%] items-center">
      <i className="text-3xl text-zinc-400 ri-search-line"></i>
      <input
        onChange={(e) => setQuery(e.target.value)}
        value={query}
        type="text"
        placeholder="Search anything"
        className="bg-transparent text-white border-3 border-zinc-400 rounded-3xl outline-none mx-6 p-2 w-[50%]"
      />
      {query.length > 0 && (
        <i
          onClick={() => setQuery("")}
          className="text-3xl text-zinc-400 ri-close-fill"
        ></i>
      )}

      <div className="z-[100] absolute w-[50%] max-h-[56vh] bg-zinc-200 top-[100%] left-[5%] overflow-auto">
        {searches?.map((s, i) => (
          <Link to={`/${s.media_type}/details/${s.id}`}
            key={i}
            className="hover:text-zinc-800 hover:bg-zinc-300 duration-300 font-semibold text-zinc-600 w-[100%] flex justify-start items-center border-b-2 border-zinc-100 p-9"
          >
            <img
              className="w-[10vh] h-[10vh] rounded object-cover mr-2"
              src={
                s.backdrop_path ||
                s.profile_path ? `https://image.tmdb.org/t/p/original/${
                  s.poster_path || s.backdrop_path || s.profile_path
                }` : noImage
              }
              alt="No Image available"
            />
            <span>
              {s.orignal_title || s.title || s.orignal_name || s.name}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Topnav;
