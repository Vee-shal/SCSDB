import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import { asyncLoadPerson, removeperson } from "../store/actions/personActions";
import HorizontalCards from "./Templates/HorizontalCards";
import Dropdown from "./Templates/Dropdown";

const PersonDetails = () => {
  const { info } = useSelector((state) => state.person);
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
 const [category, setCategory] = useState("combined")
  useEffect(() => {
    dispatch(asyncLoadPerson(id));
    return () => {
      dispatch(removeperson());
    };
  }, [id, dispatch]);

  if (!info) {
    return <h1 className="text-white">Loading...</h1>;
  }
console.log(info)
  return (
    <div className="px-15 w-full">
      {/* Navigation */}
      <nav className="w-full text-zinc-400 flex text-xl gap-10 pt-8">
        <Link
          onClick={() => navigate(-1)}
          className="hover:text-[#6556cd] ri-arrow-left-line"
        ></Link>
      </nav>

      {/* Person Info */}
      <div className="flex mt-10 items-center">
        <img
          className="h-[40vh] object-cover shadow-[8px_17px_38px_2px_rgba(0,0,0,0.5)]"
          src={`https://image.tmdb.org/t/p/original/${
            info.detail.profile_path || info.detail.backdrop_path
          }`}
          alt={info.detail.name}
        />
        <div className="text-white ml-10 flex flex-col gap-3">
          <h1 className="text-3xl font-black text-zinc-400 flex justify-between items-center">
            {info.detail.name}
            <div className="text-4xl text-white mt-3 flex gap-2">
              {info.externalId.facebook_id && (
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={`https://www.facebook.com/${info.externalId.facebook_id}/`}
                >
                  <i className="ri-facebook-circle-fill"></i>
                </a>
              )}
              {info.externalId.instagram_id && (
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={`https://www.instagram.com/${info.externalId.instagram_id}/?hl=en`}
                >
                  <i className="ri-instagram-fill"></i>
                </a>
              )}
              {info.detail.homepage && (
                <a
                  target="_blank"
                  rel="noopener noreferrer"
                  href={info.detail.homepage}
                >
                  <i className="ri-global-line"></i>
                </a>
              )}
            </div>
          </h1>
          <span className="text-xl italic">
            Birth Date:{" "}
            <span className="not-italic text-lg mt-2">
              {info.detail.birthday}
            </span>
          </span>
          <h1 className="text-xl italic">
            Overview:{" "}
            <p className="not-italic text-lg mt-2">{info.detail.biography}</p>
          </h1>
        </div>
      </div>

      <hr className="bg-zinc-300 border-1 border-zinc-400 mt-5 mb-4" />

      {/* Horizontal Cards Section - Ensuring it doesn't exceed 100vw */}
      <div className=" text-white  mt-7">
        <div className="flex justify-between items-center">
          <h1 className="text-3xl font-black">Known for:</h1>
          <Dropdown
            title={"Category"}
            options={["movie", "tv", "all"]}
            func={(e) => {
              e.target.value === "all" ? setCategory("combined") :
              setCategory(e.target.value)}}
          />
        </div>
        <div className="overflow-hidden max-w-[100vw]">
        <HorizontalCards data={Array.isArray(info[`${category}Credits`]?.cast) ? info[`${category}Credits`].cast : []} 
        category={category}/>

        </div>
      </div>
    </div>
  );
};

export default PersonDetails;
