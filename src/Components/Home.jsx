import React, { useEffect, useState } from "react";
import Sidenav from "./Templates/Sidenav";
import Topnav from "./Templates/Topnav";
import axios from "../utils/axios";
import Header from "./Templates/Header";
import HorizontalCards from "./Templates/HorizontalCards";
import Dropdown from "./Templates/Dropdown";
import Loading from "./Templates/Loading";

const Home = () => {
  document.title = "SCSDB | Homepage";

  const [Wallpaper, setWallpaper] = useState(null);
  const [Trending, setTrending] = useState(null);
  const [Category, setCategory] = useState("all");
  const GetHeaderWallpaper = async () => {
    try {
      const { data } = await axios.get(`/trending/all/day`);
      let randomData =
        data.results[(Math.random() * data.results.length).toFixed()];
      setWallpaper(randomData);
    } catch (error) {
      console.log("error: ", error);
    }
  };
console.log(Trending)
console.log(Wallpaper)

  const GetTrending = async () => {
    try {
      const { data } = await axios.get(`/trending/${Category}/day`);

      setTrending(data.results);
    } catch (error) {
      console.log("error: ", error);
    }
  };

  useEffect(() => {
    !Wallpaper && GetHeaderWallpaper();
    GetTrending();
  }, [Category]);

  return Wallpaper && Trending ? (
    <>
      <Sidenav />
      <div className="w-[80%] h-full overflow-auto overflow-x-hidden ml-[20%]">
        <Topnav />
        <Header data={Wallpaper} />
        <div className="p-5 flex justify-between items-center">
          <h1 className="font-semibold text-3xl text-zinc-400 ">Trending</h1>
          <Dropdown
            title="Filter"
            options={["tv", "movie", "all"]}
            func={(e)=>setCategory(e.target.value)}
          />
        </div>
        <HorizontalCards data={Trending} />
      </div>
    </>
  ) : (
    <h1 className="text-white">Loading</h1>
  );
};

export default Home;
