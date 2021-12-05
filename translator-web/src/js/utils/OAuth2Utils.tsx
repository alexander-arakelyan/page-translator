import { ACCESS_TOKEN } from "../constants/index"

export class OAuth2Utils {
  public static authorization(headers) {
    if (headers === undefined) {
      headers = {};
    }
    if (localStorage.getItem(ACCESS_TOKEN)) {
      headers.Authorization = 'Bearer ' + localStorage.getItem(ACCESS_TOKEN);
    }
    return headers;
  }
}
