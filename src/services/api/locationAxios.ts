import axios from "axios";

export const locationAxios = axios.create({
  baseURL: "/api/v1",
});
