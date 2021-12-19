import { RootState } from "../store/ReduxStore";

export const selectWords = ((state)=> {
  return state.wordsReducer.pager?.content;
});

export const selectWordsTotalPages = ((state)=> {
  return state.wordsReducer.pager?.totalPages;
});

export const selectWordsCurrentPage = ((state)=> {
  return state.wordsReducer.pager?.number;
});

export const selectWordsPageSize = ((state)=> {
  return state.wordsReducer.pager?.size;
});

export const selectWord = ((state)=> {
  return state.wordsReducer.word;
});

