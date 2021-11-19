import React, {Component} from "react";
import {
    Button,
    Container,
    FormGroup,
    Grid,
    Input,
    InputLabel, MenuItem, Select
} from "@mui/material";

class WordSearch extends Component {
    constructor(props) {
        super(props);
        this.state = {
            wordName: "",
            lang: {code: "en"}
        }
        this.onSelectLang = this.onSelectLang.bind(this);
        this.onWordNameChange = this.onWordNameChange.bind(this);
        this.onSearchClick = this.onSearchClick.bind(this);
    }

    componentDidMount() {
        this.props.onLangsList()
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (this.props.langs && prevProps.langs != this.props.langs) {
            const lang = this.props.langs[0];
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
                <Grid container spacing={5}>
                    <Grid item>
                        <FormGroup>
                            <InputLabel>Content</InputLabel>
                            <Input placeholder="Enter word" value={this.state.wordName}
                                   onChange={this.onWordNameChange}/>
                        </FormGroup>
                    </Grid>
                    <Grid item>

                        <FormGroup>
                            <InputLabel>Language</InputLabel>
                            <Select
                                value={this.state.lang?.code}
                                onChange={(event) => this.onSelectLang(event.target.value)}
                            >{langs.map((lang, index) => {
                                return (<MenuItem key={lang.code} value={lang.code}>{lang.name}</MenuItem>)
                            })}
                            </Select>
                        </FormGroup>
                    </Grid>
                    <Grid item>
                        <FormGroup>
                            <InputLabel>Actions</InputLabel>
                            <Button variant="primary" type="button" onClick={this.onSearchClick}>Find</Button>
                            {this.state.wordName && this.state.lang &&
                            <Button variant="secondary" onClick={event => this.addNewWord(event)}>Add
                                New</Button>}
                        </FormGroup>
                    </Grid>
                </Grid>
                <Grid container>
                    <FormGroup>
                        Search for: {this.state.wordName} ({this.state.lang?.name})
                    </FormGroup>
                </Grid>
            </Container>
        </React.Fragment>)
    }
}

export default WordSearch;
