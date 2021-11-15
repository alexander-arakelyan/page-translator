import Config from "../utils/Config";

const ARTICLES_REFRESHED = "ARTICLES_REFRESHED"
const ARTICLE_ADDED = "ARTICLE_ADDED"
const ARTICLE_UPDATED = "ARTICLE_SAVED"
const ARTICLE_REMOVED = "ARTICLE_REMOVED"
const ARTICLE_LOADED = "ARTICLE_LOADED"

export const ArticlesActions = {
    list: (title, page, pageSize, dispatch) => {
        return fetch(`${Config.API_BASE}/articles?title=${title}&pageNum=${page}&pageSize=${pageSize}`)
            .then(res => res.json())
            .then(pager => {
                dispatch({type: ARTICLES_REFRESHED, pager: pager});
            });
    },
    add: (article, dispatch) => {
        return fetch(`${Config.API_BASE}/articles`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(article)
        })
            .then(res => res.json())
            .then(article => {
                dispatch({type: ARTICLE_ADDED, article});
                return article;
            });
    },
    update: (article, dispatch) => {
        return fetch(`${Config.API_BASE}/articles/${article.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(article)
        })
            .then(res => res.json())
            .then(article => {
                dispatch({type: ARTICLE_UPDATED, article});
                return article;
            });
    },
    remove: (id, dispatch) => {
        return fetch(`${Config.API_BASE}/articles/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({})
        })
            .then(res => res.json())
            .then(article => {
                dispatch({type: ARTICLE_REMOVED, id});
                return article;
            });
    },
    loadById: (id, dispatch) => {
        return fetch(`${Config.API_BASE}/articles/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })
            .then(res => res.json())
            .then(article => {
                dispatch({type: ARTICLE_LOADED, article});
                return article;
            });
    },
    save: (article, dispatch) => {
        return fetch(`${Config.API_BASE}/articles/${article.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(article)
        })
            .then(res => res.json())
            .then(article => {
                dispatch({type: ARTICLE_UPDATED, article});
                return article;
            });
    }
}

export function articlesReducer(state = {}, action) {
    switch (action.type) {
        case ARTICLES_REFRESHED:
            return {...state, title: action.title, pager: action.pager}
        case ARTICLE_ADDED:
            return {...state}
        case ARTICLE_UPDATED:
            return {...state}
        case ARTICLE_REMOVED:
            return {...state}
        case ARTICLE_LOADED:
            return {...state, article: action.article}
        default:
            return {...state}
    }
}
