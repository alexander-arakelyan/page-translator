const WORDS_REFRESH = "WORDS_REFRESH";
const WORDS_ADDED = "WORDS_ADDED";
const WORDS_UPDATED = "WORDS_UPDATED";

export const WordActions = {
    list: async (wordContent, langCode, pageNum, pageSize, dispatch) => {
        await fetch(`words?pageNum=${pageNum}&pageSize=${pageSize}&content=${wordContent}&langCode=${langCode}`)
            .then(res => res.json())
            .then((pager) => {
                dispatch({type: WORDS_REFRESH, pager: pager});
            });
    },
    add: async (wordContent, langCode, dispatch) => {
        await fetch(`words`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({content: wordContent, langCode})
        })
            .then(res => res.json())
            .then((pager) => {
                dispatch({type: WORDS_ADDED, content: wordContent, lang: langCode});
            });
    },
    update: async (id, content, dispatch) => {
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
