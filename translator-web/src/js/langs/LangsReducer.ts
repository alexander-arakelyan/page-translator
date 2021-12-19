import Config from "../utils/Config";
import {OAuth2Utils} from "../utils/OAuth2Utils";
import {JsonUtils} from "../utils/JsonUtils";

const LANGS_REFRESH = "LANGS_REFRESH";

export const LangActions = {
    list: function (dispatch) {
        const headers = OAuth2Utils.authorization();
        return fetch(`${Config.API_BASE}/langs`, {
            headers
        })
            .then(res => JsonUtils.tryReturnJson(res))
            .then((pager) => {
                dispatch({type: LANGS_REFRESH, pager});
            });
    }
}

function langsReducer(state = {pager: undefined}, action) {
    switch (action.type) {
        case LANGS_REFRESH:
            return {...state, pager: action.pager}
        default:
            return {...state}
    }
}

export default langsReducer
