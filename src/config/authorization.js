import {getToken} from "../shared/auth";

export const config = {
  headers: { Authorization: `Bearer ${getToken()}` }
};