import React, { useState } from "react";

import { WordsGrid } from "../words/WordsGrid";
import { WordsActions } from "../words/WordsReducer";
import { LangActions } from "../langs/LangsReducer";
import { WordSearch } from "./WordSearch";

import { useSelector, useDispatch } from "react-redux";
import { selectLangs } from "../langs/LangsSelector";
import {
  selectWord,
  selectWords,
  selectWordsCurrentPage,
  selectWordsPageSize,
  selectWordsTotalPages
} from "./WordSelectors";

export const WordsPage = ({}) => {
  const dispatch = useDispatch();

  const words = useSelector(selectWords);
  const pageSize = useSelector(selectWordsPageSize);
  const currentPage = useSelector(selectWordsCurrentPage);
  const totalPages = useSelector(selectWordsTotalPages);
  const word = useSelector(selectWord);
  const langs = useSelector(selectLangs);

  const onWordsList = (word, langCode, page = 0, pageSize = 5) => {
    return WordsActions
    .list(word, langCode, page, pageSize, dispatch)
    .then(r => {
    });
  }
  const onWordAdd = (word, langCode, pageSize = 15) => {
    return WordsActions
    .add(word, langCode, dispatch)
    .then(() => {
      return WordsActions
      .list(word, langCode, 0, pageSize, dispatch)
      .then(r => {
      });
    });
  }
  const onWordUpdate = (id, name) => {
    return WordsActions
    .update(id, name, dispatch)
    .then(r => {
    });
  }
  const onLangsList = (content) => {
    return LangActions.list(dispatch);
  };

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
