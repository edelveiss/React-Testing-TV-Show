import axios from "axios";
export const fetchShow = (showApi) => {
  return axios
    .get(
      showApi
      //"https://api.tvmaze.com/singlesearch/shows?q=stranger-things&embed=episodes"
    )
    .then((res) => {
      return res;
    });
};
