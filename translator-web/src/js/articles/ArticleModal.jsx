import React, {useEffect, useRef, useState} from "react";
import {Button, Col, Form, FormControl, Modal} from "react-bootstrap";
import JoditEditor from "jodit-react";

const ArticleModal = ({article, show, onClose, onSave, onRemove, props}) => {
    const editor = useRef(null)

    const [id, setId] = useState(0);
    const [title, setTitle] = useState("");
    const [link, setLink] = useState("");
    const [content, setContent] = useState("");

    useEffect(() => {
        if (!article) {
            setId(0);
            setTitle("");
            setLink("")
            setContent("")
        } else if (id != article?.id) {
            setId(article?.id);
            setTitle(article?.title);
            setLink(article?.link)
            setContent(article?.content)
        }
    })

    const config = {readonly: false}
    return (<React.Fragment>
        <div style={{width: "100%"}}>
            <Modal show={show} animation={false} onHide={() => {
                onClose(false);
            }} centered={true}>
                <Modal.Dialog size={"xl"} centered={true} draggable={false}>
                    <Modal.Header closeButton onHide={() => {
                        onClose(false);
                    }}>
                        <Modal.Title>[{article?.id}] {article?.title}</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Row>
                                <Form.Group as={Col}>
                                    <FormControl
                                        placeholder="Title"
                                        aria-label="Title"
                                        aria-describedby="basic-addon2"
                                        value={title}
                                        onChange={(event) => {
                                            setTitle(event.target.value)
                                        }}
                                    />
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col}>
                                    <FormControl
                                        placeholder="Link"
                                        aria-label="Link"
                                        aria-describedby="basic-addon2"
                                        value={link}
                                        onChange={(event) => {
                                            setLink(event.target.value)
                                        }}
                                    />
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col}>
                                    <JoditEditor
                                        ref={editor}
                                        value={content}
                                        config={config}
                                        tabIndex={1} // tabIndex of textarea
                                        onBlur={newContent => setContent(newContent)} // preferred to use only this option to update the content for performance reasons
                                        onChange={newContent => {
                                            setContent(content);
                                        }}
                                    />
                                </Form.Group>
                            </Form.Row>
                        </Form>
                        <pre>{JSON.stringify(article, null, 2)}</pre>
                    </Modal.Body>
                    <Modal.Footer>

                        <Button variant="danger" onClick={() => {
                            if (confirm(`Delete [${article.id}] ${article.title}?`)) {
                                onRemove(article.id);
                            }
                        }}>Delete</Button>

                        <Button variant="primary" onClick={() => {
                            onSave({...article, title, link, content});
                        }}>Save</Button>

                        <Button variant="secondary" onClick={() => {
                            onClose();
                        }}>Close</Button>

                    </Modal.Footer>
                </Modal.Dialog>
            </Modal>
        </div>
    </React.Fragment>);
}

export default ArticleModal;
