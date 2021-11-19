import React, {Component} from "react"
import {TagsActions} from "../tags/TagsReducer";
import {connect} from "react-redux";
import {WordsActions} from "../words/WordsReducer";
import {
    Button,
    FormControl,
    FormGroup,
    Grid,
    Input,
    InputLabel,
    Table,
    TableBody,
    TableCell,
    TableRow
} from "@mui/material";

class WordTags extends Component {
    constructor(props) {
        super(props);
        this.state = {
            tagName: ""
        }
        this.addTagNameChanged = this.addTagNameChanged.bind(this);
        this.onTagAdd = this.props.onTagAdd.bind(this);
        this.onTagRemove = this.props.onTagRemove.bind(this);
    }

    addTagNameChanged(tagName) {
        this.setState({tagName});
    }

    render() {
        const wordId = this.props.word.id;
        const words = this.props.words;
        const word = words && words[wordId];
        let tags;
        if (word) {
            tags = word.tags;
        } else {
            tags = this.props.word.tags;
        }

        return (<React.Fragment>
            <Table size="small">
                <TableBody>
                    {tags.map((tag, index) => {
                        return (
                            <TableRow key={`tag-${wordId}-${tag.id}`}>
                                <TableCell>{tag.id}</TableCell>
                                <TableCell>{tag.name}</TableCell>
                                <TableCell>{tag.langName}</TableCell>
                                <TableCell>
                                    <Button variant="outline-primary" onClick={event => {
                                        this.onTagRemove(wordId, tag.id)
                                    }}>Remove</Button>
                                </TableCell>
                            </TableRow>)
                    })}
                </TableBody>
            </Table>
            <FormGroup className={"mb-3"}>
                <Grid container>
                    <Grid item>
                        <Input
                            placeholder="Tag Name"
                            value={this.state.tagName}
                            onChange={(event) => {
                                this.addTagNameChanged(event.target.value);
                            }}
                        />
                    </Grid>
                    <Grid>
                        <Button variant="outline-primary" onClick={event => {
                            this.props.onTagAdd(this.props.word.id, this.state.tagName)
                        }}>Add</Button>
                    </Grid>
                </Grid>
            </FormGroup>
        </React.Fragment>)
    }
}

export const TagsConnected = connect((state, props) => {
    const wordsReducer = state.wordsReducer;
    const {words} = wordsReducer;
    return {words}
}, (dispatch) => {
    return {
        onTagAdd: (wordId, tagName) => {
            TagsActions
                .addTagToWordByName(wordId, tagName, dispatch)
                .then(r => {
                    WordsActions
                        .loadById(wordId, dispatch)
                        .then(word => {
                        });
                });
        },
        onTagRemove: (wordId, tagId) => {
            TagsActions
                .removeTagFromWord(wordId, tagId, dispatch)
                .then(r => {
                    WordsActions
                        .loadById(wordId, dispatch)
                        .then(word => {
                        });
                });
        }
    }
})(WordTags);
