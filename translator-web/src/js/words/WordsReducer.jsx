const WORDS_REFRESH = "WORDS_REFRESH";
const WORDS_REFRESHED = "WORDS_REFRESHED";

const WORD_ADDED = "WORD_ADDED";
const WORD_REFRESH = "WORD_REFRESH";
const WORD_REFRESHED = "WORD_REFRESHED";
const WORD_TAG_ADDED = "WORD_TAG_ADDED";
const WORD_TAG_REMOVED = "WORD_TAG_REMOVED";

export const WordsActions = {
    list: async (name, langCode, pageNum, pageSize, dispatch) => {
        await fetch(`words?pageNum=${pageNum}&pageSize=${pageSize}&name=${name}&langCode=${langCode}`)
            .then(res => res.json())
            .then((pager) => {
                dispatch({type: WORDS_REFRESHED, pager: pager});
            });
    },
    add: async (name, langCode, dispatch) => {
        await fetch(`words`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({name, langCode})
        })
            .then(res => res.json())
            .then((pager) => {
                dispatch({type: WORD_ADDED, name, lang: langCode});
            });
    },
    update: async (id, name, dispatch) => {
        return {}
    },
    addTag: async (wordId, tagName, dispatch) => {
        await fetch(`words/${wordId}/tags`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({name: tagName})
        })
            .then(res => res.json())
            .then((pager) => {
                dispatch({type: WORD_TAG_ADDED, pager: pager});
            });
    },
    removeTag: async (wordId, tagId, dispatch) => {
        dispatch({type: WORD_TAG_REMOVED, wordId, tagId});
    },
    loadById: async (wordId, dispatch) => {
        await fetch(`words/${wordId}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then((word) => {
                dispatch({type: WORD_REFRESHED, wordId, word})
            });
    }
}

export function wordsReducer(state = {}, action) {
    switch (action.type) {
        case WORDS_REFRESHED:
            const {pager} = action;
            console.log(pager);
            return {...state, pager}
        default:
            return {...state}
    }
}

export function wordReducer(state = {words: []}, action) {
    switch (action.type) {
        case WORD_ADDED:
            return {...state, name: action.name, lang: action.lang}
        case WORD_REFRESHED: {
            const words = [...state.words];
            const {word} = action;
            const id = word.id;
            words[id] = {...word};
            return {...state, words: [...words]}
        }
        default:
            return {...state}
    }
}
