import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Topnav from "./Templates/Topnav";
import Dropdown from "./Templates/Dropdown";
import axios from "../utils/axios";
import VerticalCards from "./Templates/VerticalCards";
import InfiniteScroll from "react-infinite-scroll-component";

const Person = () => {
  document.title = "SCSDB | Person";

  const navigate = useNavigate();
  const [category, setCategory] = useState("popular"); // Fixed default category
  const [Person, setPerson] = useState([]);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  // Fetch Celebs Data
  const fetchPerson = async () => {
    try {
      console.log(`Fetching: /person/${category}?page=${page}`); // Debugging log

      const { data } = await axios.get(`/person/${category}?page=${page}`);

      setPerson((prevShows) =>
        page === 1 ? data.results : [...prevShows, ...data.results]
      );

      if (!data.results || data.results.length === 0) {
        setHasMore(false); // Stop infinite scrolling if no more data
      } else {
        setPage((prevPage) => prevPage + 1);
      }
    } catch (error) {
      console.error("Error fetching celebs: ", error.response || error);
    }
  };

  // Reset state when category changes
  useEffect(() => {
    setPerson([]); // Clear previous results
    setPage(1); // Reset page
    setHasMore(true); // Reset infinite scroll
    fetchPerson(); // Fetch new category data
  }, [category]); // Runs when category changes

  return (
    <div className="min-h-screen w-screen p-6 overflow-hidden overflow-y-auto">
      {/* Header Section */}
      <div className="w-full flex items-center space-x-4">
        <h1 className="text-2xl w-[28vw] font-semibold text-zinc-400 flex items-baseline">
          <i
            onClick={() => navigate(-1)}
            className="hover:text-[#6556cd] ri-arrow-left-line cursor-pointer"
          ></i>
          Celebs
          <small className="ml-2 text-xs text-zinc-600">
            ({category.charAt(0).toUpperCase() + category.slice(1)})
          </small>
        </h1>

        <Topnav />
        
     
      </div>

      {/* Person List with Infinite Scroll */}
      {Person.length > 0 ? (
        <InfiniteScroll
          next={fetchPerson}
          hasMore={hasMore}
          dataLength={Person.length}
          loader={<h1 className="text-white">Loading...</h1>}
          endMessage={<h1 className="text-white">No More Data</h1>}
        >
          <VerticalCards data={Person} title={"person"} />
        </InfiniteScroll>
      ) : (
        <h1 className="text-white text-center mt-10">Loading...</h1>
      )}
    </div>
  );
};

export default Person;
