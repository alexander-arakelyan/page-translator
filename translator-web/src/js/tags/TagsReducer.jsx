import Config from "../utils/Config";

export const TAGS_REFRESH = "TAGS_REFRESH";
export const WORD_TAGS_UPDATED = "WORD_TAGS_UPDATED";

export const TagsActions = {
    listWordTags: async (wordId, dispatch) => {
        await fetch(`${Config.API_BASE}/tags`)
            .then(res => res.json())
            .then((pager) => {
                dispatch({type: TAGS_REFRESH, pager});
            })
    },
    addTagToWord: async (wordId, tagId, dispatch) => {
        return await fetch(`${Config.API_BASE}/words/${wordId}/tags`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({id: tagId})
        })
            .then(res => res.json())
            .then((pager) => {
                dispatch({type: TAGS_REFRESH, pager});
            })
    },
    addTagToWordByName: async (wordId, name, dispatch) => {
        return await fetch(`${Config.API_BASE}/words/${wordId}/tags/by-name`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({name: name})
        })
            .then(res => res.json())
            .then(() => {
                dispatch({type: TAGS_REFRESH});
                dispatch({type: WORD_TAGS_UPDATED});
            });
    },
    removeTagFromWord: async (wordId, tagId, dispatch) => {
        return await fetch(`${Config.API_BASE}/words/${wordId}/tags`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({id: tagId})
        })
            .then(res => res.json())
            .then(() => {
                dispatch({type: TAGS_REFRESH});
                dispatch({type: WORD_TAGS_UPDATED});
            });
    }
}

function tagsReducer(state = {}, action) {
    switch (action.type) {
        case TAGS_REFRESH:
            return {...state}
        default:
            return {...state}
    }
}

export default tagsReducer;
