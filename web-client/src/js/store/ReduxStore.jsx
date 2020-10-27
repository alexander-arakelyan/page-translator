import {combineReducers, createStore} from "redux";
import wordsReducer from "../words/WordsReducer";
import langsReducer from "../langs/LangsReducer";

const reduxStore = createStore(
    combineReducers({
        wordsReducer,
        langsReducer
    }),
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
)

export default reduxStore
