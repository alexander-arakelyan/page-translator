import React, {useEffect, useState} from "react";
import {connect, useDispatch} from "react-redux";
import {ArticleWordsGrid} from "./ArticleWordsGrid";
import {ArticleWordsAction} from "./ArtiicleWordsReducer";
import {WordsActions} from "../words/WordsReducer";
import {Button, FormControl, FormGroup, Grid, Input, InputLabel, MenuItem, Select, TableRow} from "@mui/material";

const ArticleWordsComponent = ({
                                   article, words, articleWords = [],
                                   findArticleWords,
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
            findArticleWords(article.id, wordContent);
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
        <FormGroup>
            <Grid container spacing={5}>
                <Grid item xs={7}>
                    <FormGroup>
                        <InputLabel title="Word"/>
                        <Input
                            placeholder="Word"
                            value={wordContent}
                            onChange={(event) => {
                                let val = event.target.value;
                                setWordContent(val);
                                if (article.id && val) {
                                    findArticleWords(article.id, val);
                                    findWords(val, langCode);
                                }
                            }}
                        />
                    </FormGroup>
                </Grid>
                <Grid item xs={2}>
                    <FormGroup>
                        <InputLabel title={langCode ? langCode : "Language"}/>
                        <Select
                            value={langCode}
                            onChange={(e) => {
                                setLangCode(e.target.value);
                            }}
                        >{
                            langs && langs.map((lang, index) => {
                                return (<MenuItem
                                    key={lang.code}
                                    value={lang.code}
                                >{lang.name}</MenuItem>)
                            })
                        }
                        </Select>
                    </FormGroup>
                </Grid>
                <Grid item xs={1}>
                    <FormGroup>
                        <Button onClick={() => {
                            setWordContent("");
                            findArticleWords(article.id, "");
                            findWords(wordContent, langCode);
                        }}>Clear</Button>
                    </FormGroup>
                </Grid>
                <Grid item xs={1}>
                    <FormGroup>
                        <Button onClick={() => {
                            findWords(wordContent, langCode);
                        }}>Find</Button>
                    </FormGroup>
                </Grid>
                <Grid item xs={1}>
                    <FormGroup>
                        <Button onClick={() => {
                            addWord(article.id, wordContent, langCode)
                                .then(() => {
                                    findArticleWords(article.id, wordContent);
                                    findWords(wordContent, langCode);
                                })
                                .catch(() => {
                                    findArticleWords(article.id, wordContent);
                                    findWords(wordContent, langCode);
                                });
                        }}>Add</Button>
                    </FormGroup>
                </Grid>
            </Grid>
        </FormGroup>
        <ArticleWordsGrid
            words={words}
            articleWords={articleWords}
            onAdd={(word) => {
                add(article.id, word.id)
                    .then(() => {
                        findArticleWords(article.id, word.name);
                        findWords(word.name, word.langCode);
                    })
                    .catch(() => {
                        findArticleWords(article.id, word.name);
                        findWords(word.name, word.langCode)
                    });
            }}
            onRemove={(articleWord) => {
                remove(article.id, articleWord.wordId)
                    .then(() => {
                        setWordContent(articleWord.wordName);
                        setLangCode(articleWord.langCode);
                        findArticleWords(article.id, articleWord.wordName);
                        findWords(articleWord.wordName, articleWord.langCode)
                    })
                    .catch(() => {
                        setWordContent(articleWord.wordName);
                        setLangCode(articleWord.langCode);
                        findArticleWords(article.id, articleWord.wordName);
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
        findArticleWords: (articleId, wordName) => {
            return ArticleWordsAction.listWords(articleId, wordName, dispatch);
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
