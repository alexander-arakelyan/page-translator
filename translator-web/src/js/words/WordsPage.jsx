import React, {Component} from "react";
import {connect} from "react-redux";

import WordsGrid from "../words/WordsGrid";
import {WordsActions} from "../words/WordsReducer";
import {LangActions} from "../langs/LangsReducer";
import WordSearch from "./WordSearch";

class WordsPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            wordName: "",
            langCode: ""
        }
        this.onWordsList = props.onWordsList.bind(this);
        this.onLangsList = props.onLangsList.bind(this);
        this.onWordAdd = props.onWordAdd.bind(this);
    }

    render() {
        return (<React.Fragment>
                <h5>Words:</h5>
                <WordSearch
                    langs={this.props.langs}
                    onLangsList={this.props.onLangsList}
                    onWordsList={(wordName, langCode) => {
                        this.setState({wordName, langCode});
                        this.props.onWordsList(wordName, langCode);
                    }}
                    onWordAdd={(wordName, langCode) => {
                        this.props.onWordAdd(wordName, langCode, this.props.pageSize)
                    }}
                />
                <WordsGrid
                    rows={this.props.words}
                    pageSize={this.props.pageSize}
                    totalPages={this.props.totalPages}
                    currentPage={this.props.currentPage}
                    pageClicked={(page, pageSize) => {
                        this.onWordsList(this.state.wordName, this.state.langCode, page, pageSize)
                    }}
                />
            </React.Fragment>
        )
    }
}

export const WordsPageConnected = connect((state, props) => {
    const wordsReducer = state.wordsReducer;
    const langsReducer = state.langsReducer;
    return {
        words: wordsReducer.pager?.content,
        pageSize: wordsReducer.pager?.size,
        currentPage: wordsReducer.pager?.number,
        totalPages: wordsReducer.pager?.totalPages,
        word: wordsReducer.word,
        langs: langsReducer.pager?.content,
    }
}, (dispatch) => {
    return {
        onWordsList: (word, langCode, page = 0, pageSize = 5) => {
            return WordsActions
                .list(word, langCode, page, pageSize, dispatch)
                .then(r => {
                });
        },
        onWordAdd: (word, langCode, pageSize = 15) => {
            return WordsActions
                .add(word, langCode, dispatch)
                .then(() => {
                    return WordsActions
                        .list(word, langCode, 0, pageSize, dispatch)
                        .then(r => {
                        });
                });
        },
        onWordUpdate: (id, name) => {
            return WordsActions
                .update(id, name, dispatch)
                .then(r => {
                });
        },
        onLangsList: (content) => {
            return LangActions.list(dispatch);
        },
    }
})(WordsPage);
