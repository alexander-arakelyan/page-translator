import { RootState } from "../store/ReduxStore";

export const selectArticleWords = ((state) => {
  return state.articleWordsReducer.pager?.content || [];
});
