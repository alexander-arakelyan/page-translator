import React, {useEffect, useState} from "react";
import {Button, ButtonGroup, Col, Container, Form} from "react-bootstrap";

export const ArticleSearch = ({articleTitle, onSearch, onAdd}) => {
    const [titleInternal, setTitleInternalInternal] = useState("");

    useEffect(() => {
        if (titleInternal != articleTitle) {
            setTitleInternalInternal(articleTitle);
        }
    })

    return (<React.Fragment>
        <Container fluid={"md"}>
            <Form>
                <Form.Row>
                    <Form.Group as={Col}>
                        <Form.Control type={"text"} placeholder={"Enter title"} value={titleInternal}
                                      onChange={(val) => {
                                          const nextVal = val.target.value;
                                          setTitleInternalInternal(nextVal);
                                          onSearch(nextVal);
                                      }}
                        />
                    </Form.Group>
                    <Form.Group as={Col}>
                        <ButtonGroup>
                            <Button variant="primary" type="button" onClick={() => {
                                onSearch(titleInternal);
                            }}>Find</Button>
                            {titleInternal && <Button variant="secondary" onClick={event => {
                                onAdd(titleInternal);
                            }}>Add</Button>}
                            {titleInternal && <Button variant="secondary" onClick={event => {
                                setTitleInternalInternal("");
                                onSearch("")
                            }}>Clear</Button>}
                        </ButtonGroup>
                    </Form.Group>
                </Form.Row>
            </Form>
        </Container>
    </React.Fragment>);
}
