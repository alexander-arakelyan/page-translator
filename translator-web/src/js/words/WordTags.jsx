import React, {Component} from "react"
import {Button, Form, FormControl, InputGroup} from "react-bootstrap";
import {TagsActions} from "../tags/TagsReducer";
import {connect} from "react-redux";
import {WordsActions} from "../words/WordsReducer";

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
            <table>
                <tbody>
                {tags.map((tag, index) => {
                    return (<React.Fragment key={`tag-${wordId}-${tag.id}`}>
                        <tr>
                            <td>{tag.id}</td>
                            <td>{tag.name}</td>
                            <td>{tag.langName}</td>
                            <td>
                                <Button variant="outline-primary" onClick={event => {
                                    this.onTagRemove(wordId, tag.id)
                                }}>Remove</Button>
                            </td>
                        </tr>
                    </React.Fragment>)
                })}
                </tbody>
            </table>
            <Form>
                <InputGroup className={"mb-3"}>
                    <FormControl
                        placeholder="Tag Name"
                        aria-label="Tag Name"
                        aria-describedby="basic-addon2"
                        value={this.state.tagName}
                        onChange={(event) => {
                            this.addTagNameChanged(event.target.value);
                        }}
                    />
                    <Button variant="outline-primary" onClick={event => {
                        this.props.onTagAdd(this.props.word.id, this.state.tagName)
                    }}>Add</Button>
                </InputGroup>
            </Form>
        </React.Fragment>)
    }
}

export const TagsConnected = connect((state, props) => {
    const wordReducer = state.wordReducer;
    const {words} = wordReducer;
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
