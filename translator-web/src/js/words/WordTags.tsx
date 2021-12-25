import React, { useEffect, useState } from "react"
import { TagsActions } from "../tags/TagsReducer";
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
import { useDispatch } from "react-redux";

export const WordTags = ({word, onTagAdd, onTagRemove}) => {
  const [ tagName, setTagName ] = useState("");

  const addTagNameChanged = (tagName) => {
    setTagName(tagName);
  }

  const wordId = word.id;
  let tags = word.tags;

  return (<React.Fragment>
    <Table size="small">
      <TableBody>
        { tags.map((tag) => {
          return (
            <TableRow key={ `tag-${ wordId }-${ tag.id }` }>
              {/*<TableCell>{ tag.id }</TableCell>*/ }
              <TableCell>{ tag.name }</TableCell>
              <TableCell>{ tag.langName }</TableCell>
              <TableCell>
                <Button variant="outlined" onClick={ () => {
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
          <Button variant="outlined" onClick={ () => {
            onTagAdd(word.id, tagName)
          } }>Add</Button>
        </Grid>
      </Grid>
    </FormGroup>
  </React.Fragment>)
}
