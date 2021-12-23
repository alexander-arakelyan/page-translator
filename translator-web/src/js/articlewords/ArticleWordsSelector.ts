export const selectArticleWords = ((state) => {
  return state.articleWordsReducer.pager?.content || [];
});
