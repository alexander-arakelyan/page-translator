import { ACCESS_TOKEN } from "../constants/index";
import { getAccessToken } from "./APIUtils";

export const OAuth2Utils = {
  authorization: (headers?) => {
    if (headers === undefined) {
      headers = {};
    }
    if (localStorage.getItem(ACCESS_TOKEN)) {
      headers.Authorization = "Bearer " + getAccessToken();
    }
    return headers;
  },
};
