import axios from "axios";

export const apiKey = `${process.env.REACT_APP_API_KEY}`;
export const axiosBase = axios.create({
  baseURL: `${process.env.REACT_APP_API}/data/2.5`,
});
