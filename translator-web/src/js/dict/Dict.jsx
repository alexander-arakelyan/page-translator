import React, {Component} from "react";

import Col, {Button, ButtonGroup, Container, Form} from "react-bootstrap"
import {connect} from "react-redux";

import WordsGrid from "../grid/WordsGrid";
import {WordActions} from "../words/WordsReducer";
import {LangActions} from "../langs/LangsReducer";
import TagsList from "./TagsList";

class Dict extends Component {
    constructor(props) {
        super(props);
        this.state = {
            word: "",
            langCode: ""
        }
        this.onWordsList = props.onWordsList.bind(this);
        this.onLangsList = props.onLangsList.bind(this);
        this.onWordAdd = props.onWordAdd.bind(this);
        this.onSelectLang = this.onSelectLang.bind(this);
        this.onContentChange = this.onContentChange.bind(this);
        this.onSearchClick = this.onSearchClick.bind(this);
    }

    componentDidMount() {
        this.onWordsList();
        this.onLangsList();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.langs && prevProps.langs != this.props.langs) {
            let lang = this.props.langs[0];
            this.setState({lang});
            this.onWordsList(this.state.word, lang.code, 0);
        }
    }

    onSelectLang(langCode) {
        const lang = this.props.langs.filter((lang) => lang.code === langCode)[0];
        this.setState({lang})
        this.onWordsList(this.state.word, langCode, 0);
    }

    onContentChange(content) {
        const word = content.target.value;
        this.setState({word});
        this.onWordsList(word, this.state.lang.code);
    }

    onSearchClick(event) {
        this.onWordsList(this.state.word, this.state.lang.code, 0);
    }

    addNewWord(event) {
        this.onWordAdd(this.state.word, this.state.lang.code, this.props.pageSize);
    }

    render() {
        const langs = this.props?.langs || [];
        const currLang = this.state.lang;
        return (<React.Fragment>
                <h5>Words:</h5>
                <Container fluid={"md"}>
                    <Form>
                        <Form.Row>
                            <Form.Group as={Col}>
                                <Form.Label>Content</Form.Label>
                                <Form.Control type="text" placeholder="Enter word" value={this.state.word}
                                              onChange={this.onContentChange}/>
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label>Language</Form.Label>
                                <Form.Control
                                    as="select"
                                    title={currLang ? currLang.name : "Language"}
                                    onChange={(e) => {
                                        this.onSelectLang(e.target.value);
                                    }}
                                >{
                                    langs.map((lang, index) => {
                                        return (<option
                                            key={lang.code}
                                            value={lang.code}
                                            active={currLang?.code == lang.code ? "active" : ""}
                                        >{lang.name}</option>)
                                    })}
                                </Form.Control>
                            </Form.Group>
                            <Form.Group as={Col}>
                                <Form.Label>Actions</Form.Label><br/>
                                <ButtonGroup>
                                    <Button variant="primary" type="button" onClick={this.onSearchClick}>Find</Button>
                                    {this.state.word && this.state.lang &&
                                    <Button variant="secondary" onClick={(event => this.addNewWord(event))}>Add
                                        New</Button>}
                                </ButtonGroup>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group>
                                Search for: {this.state.word} ({this.state.lang?.name})
                            </Form.Group>
                        </Form.Row>
                    </Form>
                </Container>
                <WordsGrid
                    columns={[
                        {title: "ID", field: "id"},
                        {title: "Content", field: "content"},
                        {title: "Language", field: "langName"},
                        {
                            title: "Tags", field: "tags", component: (props) => {
                                return (<TagsList {...props}/>)
                            }
                        }
                    ]}
                    rows={this.props.words}
                    pageSize={this.props.pageSize}
                    totalPages={this.props.totalPages}
                    currentPage={this.props.currentPage}
                    pageClicked={(page, pageSize) => {
                        this.onWordsList(this.state.word, this.state.lang.code, page, pageSize)
                    }}
                />
            </React.Fragment>
        )
    }
}

export const WordsConnected = connect((state, props) => {
    let wordsReducer = state.wordsReducer;
    let langsReducer = state.langsReducer;

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
        onWordsList: (word, langCode, page = 0, pageSize = 2) => {
            WordActions
                .list(word, langCode, page, pageSize, dispatch)
                .then(r => {
                });
        },
        onWordAdd: (word, langCode, pageSize = 2) => {
            WordActions
                .add(word, langCode, dispatch)
                .then(() => {
                    WordActions
                        .list(word, langCode, 0, pageSize, dispatch)
                        .then(r => {
                        });
                });
        },
        onWordUpdate: (id, wordContent) => {
            WordActions
                .update(id, wordContent, dispatch)
                .then(r => {
                });
        },
        onLangsList: (content) => {
            LangActions.list()(dispatch);
        },
    }
})(Dict);
