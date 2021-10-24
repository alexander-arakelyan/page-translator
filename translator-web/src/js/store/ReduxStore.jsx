import {combineReducers, createStore} from "redux";
import langsReducer from "../langs/LangsReducer";
import {wordsReducer} from "../words/WordsReducer";
import {articlesReducer} from "../articles/ArticlesReduces";

const reduxStore = createStore(
    combineReducers({
        langsReducer,
        wordsReducer,
        articlesReducer,
    }),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

export default reduxStore
