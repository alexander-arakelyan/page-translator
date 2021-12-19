import React, { Component, useState } from "react"
import { TagsActions } from "../tags/TagsReducer";
import { connect } from "react-redux";
import { WordsActions } from "../words/WordsReducer";
import {
  Button,
  FormGroup,
  Grid,
  Input,
  Table,
  TableBody,
  TableCell,
  TableRow
} from "@mui/material";

const WordTags = ({
                    word,
                    words,
                    onTagAdd,
                    onTagRemove
                  }) => {
  const [ tagName, setTagName ] = useState("");

  const addTagNameChanged = (tagName) => {
    setTagName(tagName);
  }

  const wordId = word.id;
  const word0 = words && words[wordId];
  let tags;
  if (word0) {
    tags = word0.tags;
  } else {
    tags = word.tags;
  }

  return (<React.Fragment>
    <Table size="small">
      <TableBody>
        { tags.map((tag, index) => {
          return (
            <TableRow key={ `tag-${ wordId }-${ tag.id }` }>
              <TableCell>{ tag.id }</TableCell>
              <TableCell>{ tag.name }</TableCell>
              <TableCell>{ tag.langName }</TableCell>
              <TableCell>
                <Button variant="outlined" onClick={ event => {
                  onTagRemove(wordId, tag.id)
                } }>Remove</Button>
              </TableCell>
            </TableRow>)
        }) }
      </TableBody>
    </Table>
    <FormGroup className={ "mb-3" }>
      <Grid container>
        <Grid item>
          <Input
            placeholder="Tag Name"
            value={ tagName }
            onChange={ (event) => {
              addTagNameChanged(event.target.value);
            } }
          />
        </Grid>
        <Grid>
          <Button variant="outlined" onClick={ event => {
            onTagAdd(word.id, tagName)
          } }>Add</Button>
        </Grid>
      </Grid>
    </FormGroup>
  </React.Fragment>)
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
