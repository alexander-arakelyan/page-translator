import React, {Component} from "react";
import {Button, Form, FormControl, InputGroup} from "react-bootstrap";

class Article extends Component {
    constructor(props) {
        super(props);
    }

    render() {
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
                <Button variant="outline-primary" onClick={event => {
                    // this.props.onTagAdd(this.props.word.id, this.state.tagName)
                }}>Save</Button>
            </Form>
        </React.Fragment>);
    }
}
