import { RootState } from "../store/ReduxStore";

export const selectArticle = ((state)=> {
  return state.articlesReducer.article;
});

export const selectArticles = ((state)=> {
  return state.articlesReducer.pager?.content;
});

export const selectArticlesPageSize = ((state)=> {
  return state.articlesReducer.pager?.size;
});

export const selectArticlesCurrentPage = ((state)=> {
  return state.articlesReducer.pager?.number;
});

export const selectArticlesTotalPages = ((state)=> {
  return state.articlesReducer.pager?.totalPages;
});
