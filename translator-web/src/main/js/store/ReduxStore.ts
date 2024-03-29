import { combineReducers, createStore } from "redux";
import langsReducer from "../langs/LangsReducer";
import { wordsReducer } from "../words/WordsReducer";
import { articlesReducer } from "../articles/ArticlesReduces";
import { articleWordsReducer } from "../articlewords/ArtiicleWordsReducer";
import { exportImportReducer } from "../export/ExportSelector";

const reduxStore = createStore(
  combineReducers({
    langsReducer,
    wordsReducer,
    articlesReducer,
    articleWordsReducer,
    exportImportReducer,
  }),
  // @ts-ignore
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);
export type RootState = typeof reduxStore;
export default reduxStore;
