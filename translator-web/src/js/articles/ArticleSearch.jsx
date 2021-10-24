import React, {useState} from "react";
import {Button, ButtonGroup, Col, Container, Form} from "react-bootstrap";

export const ArticleSearch = ({onSearch}) => {
    const [title, setTitle] = useState("");
    return (<React.Fragment>
        <Container fluid={"md"}>
            <Form>
                <Form.Row>
                    <Form.Group as={Col}>
                        <Form.Control type={"text"} placeholder={"Enter title"} value={title}
                                      onChange={(val) => {
                                          let nextVal = val.target.value;
                                          setTitle(nextVal);
                                          onSearch(nextVal);
                                      }}
                        />
                    </Form.Group>
                    <Form.Group as={Col}>
                        <ButtonGroup>
                            <Button variant="primary" type="button" onClick={() => {
                            }}>Find</Button>
                            {title && <Button variant="secondary" onClick={event => {
                            }}>Add New</Button>}
                        </ButtonGroup>
                    </Form.Group>
                </Form.Row>
            </Form>
        </Container>
    </React.Fragment>);
}
