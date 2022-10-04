import Config from "../utils/Config";
import { OAuth2Utils } from "../utils/OAuth2Utils";
import { JsonUtils } from "../utils/JsonUtils";
import {
  EXPORT_COMPLETE,
  IMPORT_COMPLETE,
  IMPORT_PROGRESS,
} from "./ExportSelector";

export const ExportActions = {
  export1: async (dispatch) => {
    return await fetch(Config.API_BASE + "/export", {
      method: "GET",
      headers: OAuth2Utils.authorization({
        "Content-Type": "application/json",
      }),
    }) //
      .then((res) => {
        if (res.ok != true) {
          // TODO:
          return Promise.reject(res.body);
        }
        return res.json().then((json) => {
          dispatch({
            type: EXPORT_COMPLETE,
            content: json,
          });
          return json;
        });
      });
  },
  import1: async (json, dispatch) => {
    return await fetch(Config.API_BASE + "/import", {
      method: "POST",
      headers: OAuth2Utils.authorization({
        "Content-Type": "application/json",
      }),
      body: JSON.stringify(json),
    })
      .then((res) => JsonUtils.tryReturnJson(res))
      .then((json) => {
        dispatch({ type: IMPORT_COMPLETE, content: json });
        return json;
      });
  },
  importProgress(
    words,
    from: number,
    till: number,
    chunkSize: number,
    dispatch
  ) {
    dispatch({
      type: IMPORT_PROGRESS,
      import: {
        progress: { words, from, till, chunkSize },
      },
    });
  },
};
