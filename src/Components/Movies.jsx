import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Topnav from "./Templates/Topnav";
import Dropdown from "./Templates/Dropdown";
import axios from "../utils/axios";
import VerticalCards from "./Templates/VerticalCards";
import InfiniteScroll from "react-infinite-scroll-component";

const Movies = () => {
  document.title = "SCSDB | Movies ";

  const navigate = useNavigate();
  const [Category, setCategory] = useState("now_playing");
  const [Movies, setMovies] = useState([]);
  const [Page, setPage] = useState(1);
  const [HasMore, setHasMore] = useState(true);

  // Fetch Movies data
  const GetMovies = async () => {
    try {
      const { data } = await axios.get(`/movie/${Category}?page=${Page}`);

      setMovies((prevState) =>
        Page === 1 ? data.results : [...prevState, ...data.results]
      );

      // If no more results, stop infinite scrolling
      if (data.results.length === 0) {
        setHasMore(false);
      } else {
        setPage((prevPage) => prevPage + 1);
      }
    } catch (error) {
      console.log("Error fetching Movies data: ", error);
    }
  };

  // Reset when Category changes
  useEffect(() => {
    setMovies([]); // Clear previous results
    setPage(1); // Reset page
    setHasMore(true); // Reset infinite scroll state
    GetMovies();
  }, [Category]); // Runs when Category changes

  return Movies.length > 0 ? (
    <div className="min-h-screen w-screen p-[3%] overflow-hidden overflow-y-auto -mt-6">
      <div className="w-full flex items-center">
      <h1 className="text-2xl font-semibold text-zinc-400 flex items-baseline">
  <i
    onClick={() => navigate(-1)}
    className="hover:text-[#6556cd] ri-arrow-left-line"
  ></i>
  Movies
  <small className="ml-2 text-xs text-zinc-600">({Category})</small>
</h1>

        <Topnav />
        <Dropdown
          title="Category"
          options={[ "popular", "top_rated", "upcoming","now_playing"]}
          func={(e) => {
            setCategory(e.target.value); // This will now reset the state
          }}
        />
        <div className="w-8"></div>
      </div>
      <InfiniteScroll
        next={GetMovies}
        hasMore={HasMore}
        dataLength={Movies.length}
        loader={<h1 className="text-white">Loading...</h1>}
        endMessage={<h1 className="text-white">No More Data</h1>}
      >
        <VerticalCards data={Movies} title={"movie"} />
      </InfiniteScroll>
    </div>
  ) : (
    <h1 className="text-white">Loading...</h1>
  );
};

export default Movies;
