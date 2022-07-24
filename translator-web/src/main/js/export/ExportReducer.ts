import Config from "../utils/Config";
import { getAccessToken } from "../utils/APIUtils";

export const ExportActions = {
  export1: async () => {
    return await fetch(Config.API_BASE + "/export", {
      method: "GET",
      headers: new Headers({
        Authorization: "Bearer " + getAccessToken(),
      }),
    });
  },
  import1: async () => {
    return await fetch(Config.API_BASE + "/import", {
      method: "GET",
      headers: new Headers({
        Authorization: "Bearer " + getAccessToken(),
      }),
    });
  },
};
