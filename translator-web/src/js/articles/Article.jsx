import React, {useRef, useState} from "react";
import {Button, Form, FormControl, InputGroup} from "react-bootstrap";
import JoditEditor from "jodit-react";

const Article = ({}) => {
    const editor = useRef(null)
    const [content, setContent] = useState('')
    const config = {readonly: false}
    return (<React.Fragment>
        <Form>
            <InputGroup>
                <FormControl
                    placeholder="Title"
                    aria-label="Title"
                    aria-describedby="basic-addon2"
                    // value={this.state}
                    onChange={(event) => {
                        // this.addTagNameChanged(event.target.value);
                    }}
                />
            </InputGroup>
            <JoditEditor
                ref={editor}
                value={content}
                config={config}
                tabIndex={1} // tabIndex of textarea
                onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                onChange={newContent => {
                }}
            />
            <Button variant="outline-primary" onClick={event => {
                // this.props.onTagAdd(this.props.word.id, this.state.tagName)
            }}>Save</Button>
        </Form>
    </React.Fragment>);
}

export default Article;
