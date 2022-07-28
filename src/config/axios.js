import axios from "axios";

const {PUBLIC_URL} = process.env
// console.log(BASE_URL)
console.log(PUBLIC_URL,'rbgvfdcs')
export const instance = axios.create({
  baseURL: PUBLIC_URL,
});
