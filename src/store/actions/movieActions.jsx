import axios from "../../utils/axios";
import { loadMovie } from "../reducers/movieSlice";
export { removeMovie } from "../reducers/movieSlice";

export const asyncLoadMovie = (id) => async (dispatch, getState) => {
  try {
    const details = await axios.get(`/movie/${id}`);
    const externalId = await axios.get(`/movie/${id}/external_ids`);
    const recommendations = await axios.get(`/movie/${id}/recommendations`);
    const similar = await axios.get(`/movie/${id}/similar`);
    const videos = await axios.get(`/movie/${id}/videos`);
    const watchprovider = await axios.get(`/movie/${id}/watch/providers`);

    let TheultimateData = {
      detail: details.data,
      externalId: externalId.data,
      recommendation: recommendations.data.results,
      similar: similar.data.results,
      videos: videos.data.results.find((m) => m.type === "Trailer"),
      watchprovider: watchprovider.data.results.IN,
    };
    dispatch(loadMovie(TheultimateData));
  } catch (error) {
    console.log("error:", error);
  }
};
