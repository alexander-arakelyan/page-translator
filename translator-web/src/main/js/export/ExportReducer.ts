import Config from "../utils/Config";
import { OAuth2Utils } from "../utils/OAuth2Utils";

export const ExportActions = {
  export1: async () => {
    return await fetch(Config.API_BASE + "/export", {
      method: "GET",
      headers: OAuth2Utils.authorization(),
    });
  },
  import1: async () => {
    return await fetch(Config.API_BASE + "/import", {
      method: "GET",
      headers: OAuth2Utils.authorization(),
    });
  },
};
