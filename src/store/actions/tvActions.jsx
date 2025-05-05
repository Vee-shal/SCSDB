import axios from "../../utils/axios";
import { loadtv } from "../reducers/tvSlice";
export { removetv } from "../reducers/tvSlice";

export const asyncLoadtv = (id) => async (dispatch, getState) => {
  try {
    const details = await axios.get(`/tv/${id}`);
    const externalId = await axios.get(`/tv/${id}/external_ids`);
    const recommendations = await axios.get(`/tv/${id}/recommendations`);
    const similar = await axios.get(`/tv/${id}/similar`);
    const videos = await axios.get(`/tv/${id}/videos`);
    const watchprovider = await axios.get(`/tv/${id}/watch/providers`);

    let TheultimateData = {
      detail: details.data,
      externalId: externalId.data,
      recommendation: recommendations.data.results,
      similar: similar.data.results,
      videos: videos.data.results.find((m) => m.type === "Trailer"),
      watchprovider: watchprovider.data.results.IN,
    };
    dispatch(loadtv(TheultimateData));
  } catch (error) {
    console.log("error:", error);
  }
};
