import React, {useEffect, useRef, useState} from "react";
import {Button, Col, Form, FormControl, Modal} from "react-bootstrap";
import JoditEditor from "jodit-react";
import {TextUtils} from "../utils/TextUtils";

const ArticleModal = ({article, show, onClose, onSave, onRemove, props}) => {
    const editor = useRef(null)

    const [id, setId] = useState(0);
    const [title, setTitle] = useState("");
    const [link, setLink] = useState("");
    const [content, setContent] = useState("");
    const [draft, setDraft] = useState("");

    const draftRef = useRef(null);

    const handleDraftClick = () => {
        const substr = TextUtils.selected(draftRef.current);
        if (substr) {
            console.log(substr);
        }
    };

    useEffect(() => {
        function init(id, title, link, content, draft) {
            setId(id);
            setTitle(title);
            setLink(link)
            setContent(content)
            setDraft(draft)
        }

        if (!article) {
            init(0, "", "", "", "", "")
        } else if (id != article?.id) {
            init(article?.id, article?.title, article?.link, article?.content, article?.draft);
        }
    })

    const config = {readonly: false}
    return (<React.Fragment>
        <div style={{width: "100%"}}>
            <Modal show={show} animation={false} onHide={() => {
                onClose(false);
            }} centered={true} size={"xl"} scrollable={true}>
                <Modal.Dialog size={"xl"} centered={true} draggable={false} scrollable={true}>
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
                                    <Form.Control ref={draftRef} as="textarea" rows={15} value={draft || content}
                                                  onChange={(val) => {
                                                      setDraft(val);
                                                  }}
                                                  plaintext={false}
                                                  onClick={handleDraftClick}
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
