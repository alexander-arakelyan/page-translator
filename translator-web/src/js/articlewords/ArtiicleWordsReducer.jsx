import Config from "../utils/Config";

const ARTICLE_WORDS_LOADED = "ARTICLE_WORDS_LOADED";
const ARTICLE_WORD_INCREMENTED = "ARTICLE_WORD_INCREMENTED";
const ARTICLE_WORD_DECREMENTED = "ARTICLE_WORD_DECREMENTED";

export const ArticleWordsAction = {
    listWords: async (articleId, wordName, dispatch) => {
        const params = wordName ? `word=${wordName}` : "";
        return await fetch(`${Config.API_BASE}/articles/${articleId}/words?${params}`, {
            method: "GET",
            headers: {"Content-Type": "application/json"}
        })
            .then(res => res.json())
            .then(words => {
                dispatch({type: ARTICLE_WORDS_LOADED, articleWord: words})
            });
    },
    incrementWord: async (articleId, wordId, dispatch) => {
        return await fetch(`${Config.API_BASE}/articles/${articleId}/words/${wordId}`, {
            method: "PUT",
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify({})
        })
            .then(res => res.json())
            .then(articleWord => {
                dispatch({type: ARTICLE_WORD_INCREMENTED, articleWord})
            });
    },
    decrementWord: async (articleId, wordId, dispatch) => {
        return await fetch(`${Config.API_BASE}/articles/${articleId}/words/${wordId}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({})
        })
            .then(res => res.json())
            .then(articleWord => {
                dispatch({type: ARTICLE_WORD_DECREMENTED, articleWord});
                return articleWord;
            });
    }
}

export function articleWordsReducer(state = {}, action) {
    switch (action.type) {
        case ARTICLE_WORDS_LOADED:
            return {...state, pager: action.articleWord}
        case ARTICLE_WORD_INCREMENTED:
            return {...state}
        case ARTICLE_WORD_DECREMENTED:
            return {...state}
        default:
            return {...state}
    }
}
