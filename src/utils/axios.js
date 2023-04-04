import axios, { Axios } from "axios";
import { baseURL } from "./constants";

console.log(baseURL,'baseurl');
const instance = axios.create({
    baseURL: baseURL,
})

export default instance;