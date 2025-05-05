import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
  Link,
  Navigate,
  Outlet,
  useLocation,
  useNavigate,
  useParams,
} from "react-router-dom";
import { asyncLoadtv, removetv } from "../store/actions/tvActions";
import HorizontalCards from "./Templates/HorizontalCards";

const TvDetails = () => {
  const { pathname } = useLocation();
  const { info } = useSelector((state) => state.tv);
  const navigate = useNavigate();
  const { id } = useParams();
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(asyncLoadtv(id));
    return () => {
      dispatch(removetv());
    };
  }, [id]);
  console.log(info);
  return info ? (
    <>
    <Outlet />
    <div
    
      style={{
        background: `linear-gradient(rgba(0,0,0,0.2),rgba(0,0,0,0.5),rgba(0,0,0,8)),url(https://image.tmdb.org/t/p/original/${
          info?.detail?.backdrop_path || ""
        })`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
      className="w-screen relative px-[4%]  pt-[2%]"
    >
      {/* Part 1 nav */}
      <nav className=" items-center pb-7 w-full text-zinc-400 flex text-xl gap-10 ">
        <Link
          onClick={() => navigate(-1)}
          className="hover:text-[#6556cd] ri-arrow-left-line"
        ></Link>
        <a target="_blank" href={info.detail.homepage}>
          <i class="ri-external-link-line"></i>
        </a>
        <a
          target="_blank"
          href={`https://www.wikidata.org/wiki/${info.externalId.wikidata_id}`}
        >
          <i class="ri-global-line"></i>
        </a>
        <a
          target="_blank"
          href={`https://www.imdb.com/title/${info.externalId.imdb_id}/`}
        >
          imdb
        </a>
      </nav>

      {/* Part 2 Poster and details */}
      <div className="w-full flex text-white">
        <img
          className="h-[40vh] object-cover shadow-[8px_17px_38px_2px_rgba(0,0,0,0.5)]"
          src={`https://image.tmdb.org/t/p/original/${
            info.detail.poster_path || info.detail.backdrop_path
          }`}
          alt=""
        />
        <div className="content ml-[5%]">
          <h1 className="text-5xl  font-black ">
            {info.detail.name ||
            info.detail.original_title ||
              info.detail.title ||
              info.detail.original_name 
              }
              <small className="text-xl ml-2 text-zinc-200 font-semibold">
              ({info.detail.first_air_date.split("-")[0]})
            </small>
          </h1>

          <div className="mt-4 flex items items-center gap-12 text-white">
            {/* rating */}
            <div className=" w-[7vh] right-[10%] bottom-[-21%] h-[7vh] rounded-full bg-yellow-500 flex justify-center items-center">
              {(info.detail.vote_average * 10).toFixed()}%
            </div>
            <h1 className="text-2xl -ml-10 font-semibold  w-10 leading-6">
              User rating
            </h1>
            <h1>{info.detail.release_date}</h1>
            <h1 className="-ml-5">
              {info.detail.genres.map((g) => g.name).join(" , ")}
            </h1>
            
          </div>
          <div className="italic mt-5 font-medium">{info.detail.tagline}</div>
          <div className=" mt-2 font-regular mb-5">
            <h1 className="mb-1  text-semibold">Overview :</h1>
            {info.detail.overview}
          </div>
          <Link
            to={`trailer`}
            className="rounded bg-[#6556cd] max-w-fit p-3 "
          >
            Watch Trailer
          </Link>
        </div>
      </div>

      {/* Part 3 - Watch Providers */}
      <div className="flex mt-12 items-center">
        <h1 className="text-white">Available on Platform :</h1>
        {info.watchprovider?.flatrate?.length > 0 ? (
          info.watchprovider.flatrate.map((w) => (
            <img
              title={w.provider_name}
              key={w.provider_id} // Add a unique key to prevent React warnings
              src={`https://image.tmdb.org/t/p/original/${w.logo_path}`}
              alt={w.provider_name} // Use a meaningful alt text
              className="w-10 h-10 mx-2 rounded-md"
            />
          ))
        ) : (
          <h1 className="text--950 ml-3 text-red-800">Not available</h1>
        )}
      </div>
      {/* Seasons */}
      <hr className="bg-zinc-300 border-1 border-zinc-400 mt-5 mb-4"/>
      <div className="text-white mt-3 ">
        <h1 className="text-3xl font-semibold ml-3">Seasons : </h1>
        <HorizontalCards
          data={ info.detail.seasons.length > 0 && info.detail.seasons}
        />
      </div>
      <hr className="bg-zinc-300 border-1 border-zinc-400 mt-5 mb-4"/>
      <div className="text-white mt-3 ">
        <h1 className="text-3xl font-semibold ml-3">Recommendations & Similar stuff : </h1>
        <HorizontalCards
          data={
            info.recommendation.length > 0 ? info.recommendation : info.similar
          }
        />
      </div>
      
    </div>
    </>
  ) : (
    <h1>Loading</h1>
  );
};

export default TvDetails;
