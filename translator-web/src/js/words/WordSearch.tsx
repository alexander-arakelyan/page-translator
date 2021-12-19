import React, { useEffect, useState } from "react";
import {
  Button,
  Container,
  FormGroup,
  Grid,
  Input,
  InputLabel, MenuItem, Select
} from "@mui/material";

export const WordSearch = ({
                             langs,
                             onLangsList,
                             // onSelectLang,
                             // onWordNameChange,
                             onWordAdd,
                             // onSearchClick,
                             onWordsList
                           }) => {
  const [ mounted, setMounted ] = useState(false)
  const [ wordName, setWordName ] = useState("");
  const [ lang, setLang ] = useState({code: "en", name: "English"});

  if (!mounted) {
    onLangsList()
    setMounted(true);
  }

  useEffect(() => {
    if (langs && !lang) {
      setLang(langs[0]);
    }
    onWordsList(wordName, lang?.code, 0);
  }, [ langs, lang ]);

  const onSelectLang = (langCode) => {
    const lang = langs.filter((lang) => lang.code === langCode)[0];
    setLang(lang)
    onWordsList(wordName, langCode, 0);
  }

  const onWordNameChange = (content) => {
    const wordName = content.target.value;
    setWordName(wordName);
    onWordsList(wordName, lang.code);
  }

  const onSearchClick = (event) => {
    onWordsList(wordName, lang.code, 0);
  }

  const addNewWord = (event) => {
    onWordAdd(wordName, lang.code);
  }

  return (<React.Fragment>
    <Container>
      <Grid container spacing={ 5 }>
        <Grid item>
          <FormGroup>
            <InputLabel>Content</InputLabel>
            <Input placeholder="Enter word" value={ wordName }
                   onChange={ onWordNameChange }/>
          </FormGroup>
        </Grid>
        <Grid item>

          <FormGroup>
            <InputLabel>Language</InputLabel>
            <Select
              value={ lang?.code }
              onChange={ (event) => onSelectLang(event.target.value) }
            >{ (langs || []).map((lang, index) => {
              return (<MenuItem key={ lang.code } value={ lang.code }>{ lang.name }</MenuItem>)
            }) }
            </Select>
          </FormGroup>
        </Grid>
        <Grid item>
          <FormGroup>
            <InputLabel>Actions</InputLabel>
            <Button variant="outlined" type="button" onClick={ onSearchClick }>Find</Button>
            { wordName && lang &&
            <Button variant="contained" onClick={ event => addNewWord(event) }>Add
                New</Button> }
          </FormGroup>
        </Grid>
      </Grid>
      <Grid container>
        <FormGroup>
          Search for: { wordName } ({ lang?.name })
        </FormGroup>
      </Grid>
    </Container>
  </React.Fragment>)
}
