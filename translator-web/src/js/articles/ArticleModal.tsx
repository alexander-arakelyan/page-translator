import React, { useEffect, useRef, useState } from "react";
import JoditEditor from "jodit-react";
import { TextUtils } from "../utils/TextUtils";
import { ActionWordsComponentConnected } from "../articlewords/ArticleWordsComponent";
import { LangActions } from "../langs/LangsReducer";
import { connect } from "react-redux";
import {
  Box,
  Button,
  FormControl,
  FormGroup,
  Grid, Input,
  InputLabel, MenuItem,
  Modal,
  Select,
  TableRow, TextareaAutosize,
  Typography
} from "@mui/material";

import * as classes from "../app/App.scss"

const ArticleModal = ({article, show, onClose, onSave, onRemove, onLangsList, langs, ...props}) => {
  const editor = useRef(null)

  const [ mounted, setMounted ] = useState(false);
  const [ id, setId ] = useState(0);
  const [ title, setTitle ] = useState("");
  const [ link, setLink ] = useState("");
  const [ content, setContent ] = useState("");
  const [ draft, setDraft ] = useState("");
  const [ langCode, setLangCode ] = useState("");

  const [ selectedWord, setSelectedWord ] = useState("");

  const draftRef = useRef(null);

  const handleDraftClick = () => {
    const substr = TextUtils.selected(draftRef.current);
    if (substr) {
      setSelectedWord(substr);
    }
  };

  function init(id, title, link, content, draft, langCode) {
    onLangsList();
    setId(id);
    setTitle(title);
    setLink(link)
    setContent(content)
    setDraft(draft)
    setLangCode(langCode);
  }

  if (!mounted) {
    init(0, "", "", "", "", "");
    setMounted(true);
  }

  useEffect(() => {
    init(article?.id, article?.title, article?.link, article?.content, article?.draft, article?.langCode);
  }, [ article ])

  const config = {readonly: false}

  const style = {
    position: 'absolute',
    left: '50%',
    transform: 'translate(-50%)',
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    pt: 2,
    px: 4,
    pb: 3,
    width: "90%"
  };

  return (<React.Fragment>
      <Modal open={ show }
             onClose={ () => {
               onClose(false);
             } }
             BackdropProps={ {
               classes: {
                 root: classes.backDrop
               }
             } }
      >
        <Box>
          <Box>
            <Grid container>
              <Grid item xs={ 10 }>
                <Typography component={ "h2" }>{ article?.id } - { article?.title }</Typography>
              </Grid>
              <Grid item xs={ 2 }>
                <Button variant="contained" onClick={ () => {
                  onClose();
                } } style={ {float: "right"} }>Close</Button>
              </Grid>
            </Grid>
          </Box>
          <Box>
            <FormGroup>
              <InputLabel title="Link"/>
              <Input
                value={ link }
                onChange={ (event) => setLink(event.target.value) }
                fullWidth={ true }
              />
            </FormGroup>
            <FormGroup>
              <Input
                placeholder="Title"
                value={ title }
                onChange={ (event) => setTitle(event.target.value) }
              />
            </FormGroup>
            <FormGroup>
              <InputLabel title={ langCode ? langCode : "Language" }/>
              <Select
                value={ langCode }
                onChange={ (e) => setLangCode(e.target.value) }
              >{
                langs && langs.map((lang, index) => {
                  return (<MenuItem
                    key={ lang.code }
                    value={ lang.code }
                  >{ lang.name }</MenuItem>)
                }) }
              </Select>
            </FormGroup>
            <FormGroup>
              <JoditEditor
                ref={ editor }
                value={ content }
                config={ config }
                // tabIndex={1} // tabIndex of textarea
                onBlur={ newContent => setContent(newContent) } // preferred to use only this option to update the content for performance reasons
                onChange={ newContent => setContent(content) }
              />
            </FormGroup>
            <FormGroup>
              <TextareaAutosize
                ref={ draftRef }
                minRows={ 25 }
                value={ draft || content }
                onChange={ (val) => setDraft(val.target.value) }
                onClick={ handleDraftClick }
                // fullWidth={ true }
              />
            </FormGroup>
            {
              article?.id &&
              <ActionWordsComponentConnected
                  article={ article }
                  langs={ langs }
                  selectedWord={ selectedWord }
              />
            }
          </Box>
          <Box>
            <Grid container style={ {backgroundColor: "#1976d2"} }>
              <Grid item xs={ 8 }></Grid>
              <Grid item xs={ 4 }>
                <Button variant="contained" onClick={ () => {
                  if (confirm(`Delete [${ article.id }] ${ article.title }?`)) {
                    onRemove(article.id);
                  }
                } }>Delete</Button>

                <Button variant="outlined" onClick={ () => {
                  onSave({...article, title, link, content, draft, langCode});
                } }>Save</Button>

                <Button variant="contained" onClick={ () => {
                  onClose();
                } }>Close</Button>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Modal>
    </React.Fragment>
  );
}

export const ArticleModalConnected = connect(
  (state, props) => {
    const {pager} = state.langsReducer;
    return {
      langs: pager?.content
    }
  }
  ,
  (dispatch) => {
    return {
      onLangsList: () => {
        return LangActions.list(dispatch);
      },
    }
  }
)(ArticleModal);
