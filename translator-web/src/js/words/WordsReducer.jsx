const WORDS_REFRESH = "WORDS_REFRESH";
const WORDS_ADDED = "WORDS_ADDED";
const WORDS_UPDATED = "WORDS_UPDATED";

export const wordsActions = {
    list: function (wordContent, langCode, page, pageSize) {
        return dispatch => {
            fetch(`words?pageNum=${page}&pageSize=${pageSize}&content=${wordContent}&langCode=${langCode}`)
                .then(res => res.json())
                .then((pager) => {
                    dispatch({type: WORDS_REFRESH, pager: pager});
                });
        }
    },
    add: function (content, lang) {
        return {}
    },
    update: function (id, content, lang) {
        return {}
    }
}

function wordsReducer(state = {}, action) {
    switch (action.type) {
        case WORDS_REFRESH:
            return {...state, pager: action.pager}
        case WORDS_ADDED:
            return {...state, content: action.content, lang: action.lang}
        case WORDS_UPDATED:
            return {...state, content: action.content, lang: action.lang}
        default:
            return {...state}
    }
}

export default wordsReducer
