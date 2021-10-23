import {combineReducers, createStore} from "redux";
import {wordReducer, wordsReducer} from "../words/WordsReducer";
import langsReducer from "../langs/LangsReducer";

const reduxStore = createStore(
    combineReducers({
        wordsReducer,
        wordReducer,
        langsReducer
    }),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

export default reduxStore
