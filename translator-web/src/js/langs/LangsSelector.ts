export const selectLangs = ((state)=> {
  return state.langsReducer.pager?.content;
});
