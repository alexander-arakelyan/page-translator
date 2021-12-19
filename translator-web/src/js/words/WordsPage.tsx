import React, { useState } from "react";
import { connect } from "react-redux";

import { WordsGrid } from "../words/WordsGrid";
import { WordsActions } from "../words/WordsReducer";
import { LangActions } from "../langs/LangsReducer";
import { WordSearch } from "./WordSearch";

export const WordsPage = ({langs, words, pageSize, totalPages, currentPage, onWordsList, onLangsList, onWordAdd}) => {
  const [ wordName, setWordName ] = useState("");
  const [ langCode, setLangCode ] = useState("");

  return (<React.Fragment>
      <h5>Words:</h5>
      <WordSearch
        langs={ langs }
        onLangsList={ onLangsList }
        onWordsList={ (wordName, langCode) => {
          setWordName(wordName);
          setLangCode(langCode);
          onWordsList(wordName, langCode);
        } }
        onWordAdd={ (wordName, langCode) => {
          onWordAdd(wordName, langCode, pageSize)
        } }
      />
      <WordsGrid
        rows={ words }
        pageSize={ pageSize }
        totalPages={ totalPages }
        currentPage={ currentPage }
        pageClicked={ (page, pageSize) => {
          onWordsList(wordName, langCode, page, pageSize)
        } }
      />
    </React.Fragment>
  )
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
