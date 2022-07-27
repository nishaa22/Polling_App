import axios from "axios";

const {BASE_URL} = process.env
// console.log(BASE_URL)
export const instance = axios.create({
  baseURL: BASE_URL,
});
