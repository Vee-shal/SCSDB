import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Topnav from "./Templates/Topnav";
import Dropdown from "./Templates/Dropdown";
import axios from "../utils/axios";
import VerticalCards from "./Templates/VerticalCards";
import InfiniteScroll from "react-infinite-scroll-component";

const Trending = () => {
  document.title = "SCSDB | Trending ";

  const navigate = useNavigate();
  const [Category, setCategory] = useState("all");
  const [Duration, setDuration] = useState("day");
  const [Trending, setTrending] = useState([]);
  const [Page, setPage] = useState(1);
  const [HasMore, setHasMore] = useState(true);

  // Fetch trending data
  const GetTrending = async () => {
    try {
      const { data } = await axios.get(`/trending/${Category}/${Duration}?page=${Page}`);

      setTrending((prevState) => (Page === 1 ? data.results : [...prevState, ...data.results]));

      // If no more results, stop infinite scrolling
      if (data.results.length === 0) {
        setHasMore(false);
      } else {
        setPage((prevPage) => prevPage + 1); 
      }
    } catch (error) {
      console.log("Error fetching trending data: ", error);
    }
  };

  // Reset when Category or Duration changes
  useEffect(() => {
    setTrending([]);  // Clear previous results
    setPage(1);       // Reset page
    setHasMore(true); // Reset infinite scroll state
    GetTrending();
  }, [Category, Duration]); // Runs when Category or Duration changes

  return Trending.length > 0 ? (
    <div className="min-h-screen w-screen p-[3%] overflow-hidden overflow-y-auto">
      <div className="w-full flex items-center">
        <h1 className="text-2xl font-semibold text-zinc-400">
          <i onClick={() => navigate(-1)} className="hover:text-[#6556cd] ri-arrow-left-line"></i>
          Trending
        </h1>
        <Topnav />
        <Dropdown
          title="Category"
          options={["movie", "tv", "all"]}
          func={(e) => {
            setCategory(e.target.value); // This will now reset the state
          }}
        />
        <div className="w-8"></div>
        <Dropdown
          title="Duration"
          options={["week", "day"]}
          func={(e) => {
            setDuration(e.target.value); // This will now reset the state
          }}
        />
      </div>
      <InfiniteScroll
        next={GetTrending}
        hasMore={HasMore}
        dataLength={Trending.length}
        loader={<h1 className="text-white">Loading...</h1>}
        endMessage={<h1 className="text-white">No More Data</h1>}
      >
        <VerticalCards data={Trending} title={Category} />
      </InfiniteScroll>
    </div>
  ) : (
    <h1 className="text-white">Loading...</h1>
  );
};

export default Trending;
