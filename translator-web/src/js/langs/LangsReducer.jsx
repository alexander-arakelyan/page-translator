const LANGS_REFRESH = "LANGS_REFRESH";

export const LangActions = {
    list: function () {
        return dispatch => {
            fetch("langs")
                .then(res => res.json())
                .then((pager) => {
                    dispatch({type: LANGS_REFRESH, pager});
                })
        }
    }
}

function langsReducer(state = {}, action) {
    switch (action.type) {
        case LANGS_REFRESH:
            return {...state, pager: action.pager}
        default:
            return {...state}
    }
}

export default langsReducer
