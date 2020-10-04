import axios from 'axios';
import {BASE_URL_API} from "../../config/url";

const api = axios.create({
  baseURL: BASE_URL_API,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
});

export default api;