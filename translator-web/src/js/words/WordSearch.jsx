import React, {Component} from "react";
import {Button, ButtonGroup, Col, Container, Form} from "react-bootstrap";

class WordSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            wordName: "",
            langCode: ""
        }
        this.onSelectLang = this.onSelectLang.bind(this);
        this.onWordNameChange = this.onWordNameChange.bind(this);
        this.onSearchClick = this.onSearchClick.bind(this);
    }

    componentDidMount() {
        this.props.onLangsList();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.langs && prevProps.langs != this.props.langs) {
            let lang = this.props.langs[0];
            this.setState({lang});
            this.props.onWordsList(this.state.wordName, lang.code, 0);
        }
    }

    onSelectLang(langCode) {
        const lang = this.props.langs.filter((lang) => lang.code === langCode)[0];
        this.setState({lang})
        this.props.onWordsList(this.state.wordName, langCode, 0);
    }

    onWordNameChange(content) {
        const wordName = content.target.value;
        this.setState({wordName});
        this.props.onWordsList(wordName, this.state.lang.code);
    }

    onSearchClick(event) {
        this.props.onWordsList(this.state.wordName, this.state.lang.code, 0);
    }

    addNewWord(event) {
        this.props.onWordAdd(this.state.wordName, this.state.lang.code);
    }

    render() {
        const langs = this.props?.langs || [];
        const currLang = this.state.lang;
        return (<React.Fragment>
            <Container fluid={"md"}>
                <Form>
                    <Form.Row>
                        <Form.Group as={Col}>
                            <Form.Label>Content</Form.Label>
                            <Form.Control type="text" placeholder="Enter word" value={this.state.wordName}
                                          onChange={this.onWordNameChange}/>
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
                                {this.state.wordName && this.state.lang &&
                                <Button variant="secondary" onClick={event => this.addNewWord(event)}>Add
                                    New</Button>}
                            </ButtonGroup>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group>
                            Search for: {this.state.wordName} ({this.state.lang?.name})
                        </Form.Group>
                    </Form.Row>
                </Form>
            </Container>
        </React.Fragment>)
    }
}

export default WordSearch;
