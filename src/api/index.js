import axios from 'axios';
import { baseUrl } from "./constants";

console.log(baseUrl,'baseurl');

const instance = axios.create({
    baseURL: baseUrl,
})

export default instance;