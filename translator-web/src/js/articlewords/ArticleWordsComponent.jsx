import React, {useEffect, useState} from "react";
import {Button, Col, Form, FormControl, FormGroup, InputGroup, Row} from "react-bootstrap";
import {connect, useDispatch} from "react-redux";
import {ArticleWordsGrid} from "./ArticleWordsGrid";
import {ArticleWordsAction} from "./ArtiicleWordsReducer";
import {WordsActions} from "../words/WordsReducer";

const ArticleWordsComponent = ({
                                   article, words, articleWords = [],
                                   list,
                                   add, remove,
                                   findWords, addWord,
                                   langs,
                                   selectedWord,
                                   props
                               }) => {
    const [wordContent, setWordContent] = useState("");
    const [langCode, setLangCode] = useState(article.langCode);
    const [prevSelectedWord, setPrevSelectedWord] = useState(selectedWord);

    useEffect(() => {
        if (article.id) {
            list(article.id);
        }
        if (wordContent && langCode) {
            findWords(wordContent, langCode);
        }
        if (prevSelectedWord != selectedWord) {
            setPrevSelectedWord(selectedWord);
            setWordContent(selectedWord);
            setLangCode(article.langCode);
        }
    }, [wordContent, langCode, selectedWord]);

    return (<React.Fragment>
        <Form>
            <Form.Row>
                <Form.Group as={Col}>
                    <InputGroup>
                        <FormControl
                            placeholder="Word"
                            aria-label="Word"
                            aria-describedby="basic-addon2"
                            value={wordContent}
                            onChange={(event) => {
                                let val = event.target.value;
                                setWordContent(val);
                                if (article.id && val) {
                                    findWords(val, langCode);
                                }
                            }}
                        />
                        <Form.Control
                            as="select"
                            title={langCode ? langCode : "Language"}
                            onChange={(e) => {
                                setLangCode(e.target.value);
                            }}
                        >{
                            langs && langs.map((lang, index) => {
                                return (<option
                                    key={lang.code}
                                    value={lang.code}
                                    selected={langCode == lang.code ? "selected" : ""}
                                >{lang.name}</option>)
                            })}
                        </Form.Control>
                        <Button onClick={() => {
                            findWords(article.id);
                        }}>Find</Button>
                        <Button onClick={() => {
                            addWord(article.id, wordContent, langCode)
                                .then(() => {
                                    list(article.id);
                                    findWords(wordContent, langCode);
                                })
                                .catch(() => {
                                    list(article.id);
                                    findWords(wordContent, langCode);
                                });
                        }}>Add</Button>
                    </InputGroup>
                </Form.Group>
            </Form.Row>
        </Form>
        <ArticleWordsGrid
            words={words}
            articleWords={articleWords}
            onAdd={(word) => {
                add(article.id, word.id)
                    .then(() => {
                        list(article.id);
                        findWords(word.name, word.langCode);
                    })
                    .catch(() => {
                        list(article.id);
                        findWords(word.name, word.langCode)
                    });
            }}
            onRemove={(articleWord) => {
                remove(article.id, articleWord.wordId)
                    .then(() => {
                        setWordContent(articleWord.wordName);
                        setLangCode(articleWord.langCode);
                        list(article.id);
                        findWords(articleWord.wordName, articleWord.langCode)
                    })
                    .catch(() => {
                        setWordContent(articleWord.wordName);
                        setLangCode(articleWord.langCode);
                        list(article.id);
                        findWords(articleWord.wordName, articleWord.langCode);
                    });
            }}
        />
    </React.Fragment>);
}

export const ActionWordsComponentConnected = connect((state, props) => {
    const {pager: wordsPager} = state.wordsReducer;
    const {pager: articleWordsPager} = state.articleWordsReducer;
    const {pager: langsPager} = state.langsReducer;
    return {
        words: wordsPager?.content,
        langs: langsPager?.content,
        articleWords: articleWordsPager?.content
    }
}, (dispatch) => {
    return {
        list: (articleId) => {
            return ArticleWordsAction.listWords(articleId, dispatch);
        },
        add: (articleId, wordId) => {
            return ArticleWordsAction.incrementWord(articleId, wordId, dispatch);
        },
        remove: (articleId, wordId) => {
            return ArticleWordsAction.decrementWord(articleId, wordId, dispatch);
        },
        findWords: (wordContent, langCode) => {
            return WordsActions.list(wordContent, langCode, 0, 50, dispatch);
        },
        addWord: (articleId, wordContent, langCode) => {
            return WordsActions.add(wordContent, langCode, dispatch)
                .then(word => {
                    return ArticleWordsAction.incrementWord(articleId, word.id, dispatch);
                });
        }
    }
})(ArticleWordsComponent);
