import React, {useEffect, useRef, useState} from "react";
import {Button, Col, Form, FormControl, Modal} from "react-bootstrap";
import JoditEditor from "jodit-react";
import {TextUtils} from "../utils/TextUtils";
import {ActionWordsComponentConnected} from "../articlewords/ArticleWordsComponent";
import langsReducer, {LangActions} from "../langs/LangsReducer";
import {WordsActions} from "../words/WordsReducer";
import {ArticlesActions as ArticleActions} from "./ArticlesReduces";
import {connect} from "react-redux";

const ArticleModal = ({article, show, onClose, onSave, onRemove, onLangsList, langs, props}) => {
    const editor = useRef(null)

    const [id, setId] = useState(0);
    const [title, setTitle] = useState("");
    const [link, setLink] = useState("");
    const [content, setContent] = useState("");
    const [draft, setDraft] = useState("");
    const [langCode, setLangCode] = useState("");

    const [selectedWord, setSelectedWord] = useState("");

    const draftRef = useRef(null);

    const handleDraftClick = () => {
        const substr = TextUtils.selected(draftRef.current);
        if (substr) {
            setSelectedWord(substr);
        }
    };

    useEffect(() => {
        function init(id, title, link, content, draft, langCode) {
            onLangsList();
            setId(id);
            setTitle(title);
            setLink(link)
            setContent(content)
            setDraft(draft)
            setLangCode(langCode);
        }

        if (!article) {
            init(0, "", "", "", "", "", "")
        } else if (id != article?.id) {
            init(article?.id, article?.title, article?.link, article?.content, article?.draft, article?.langCode);
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
                        <Modal.Title>{article?.id} - {article?.title}</Modal.Title>
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
                                        onChange={(event) => setTitle(event.target.value)}
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
                                        onChange={(event) => setLink(event.target.value)}
                                    />
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col}>
                                    <Form.Control
                                        as="select"
                                        title={langCode ? langCode : "Language"}
                                        onChange={(e) => setLangCode(e.target.value)}
                                    >{
                                        langs && langs.map((lang, index) => {
                                            return (<option
                                                key={lang.code}
                                                value={lang.code}
                                                selected={langCode == lang.code ? "selected" : ""}
                                            >{lang.name}</option>)
                                        })}
                                    </Form.Control>
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
                                        onChange={newContent => setContent(content)}
                                    />
                                </Form.Group>
                            </Form.Row>
                            <Form.Row>
                                <Form.Group as={Col}>
                                    <Form.Control ref={draftRef} as="textarea" rows={15} value={draft || content}
                                                  onChange={(val) => setDraft(val.target.value)}
                                                  plaintext={false}
                                                  onClick={handleDraftClick}
                                    />
                                </Form.Group>
                            </Form.Row>
                            {
                                article?.id &&
                                <Form.Row>
                                    <ActionWordsComponentConnected
                                        article={article}
                                        langs={langs}
                                        selectedWord={selectedWord}
                                    />
                                </Form.Row>
                            }
                        </Form>
                    </Modal.Body>
                    <Modal.Footer>

                        <Button variant="danger" onClick={() => {
                            if (confirm(`Delete [${article.id}] ${article.title}?`)) {
                                onRemove(article.id);
                            }
                        }}>Delete</Button>

                        <Button variant="primary" onClick={() => {
                            onSave({...article, title, link, content, draft, langCode});
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

export const ArticleModalConnected = connect(
    (state, props) => {
        const {pager} = state.langsReducer;
        return {
            langs: pager?.content
        }
    },
    (dispatch) => {
        return {
            onLangsList: () => {
                return LangActions.list(dispatch);
            },
        }
    }
)(ArticleModal);
