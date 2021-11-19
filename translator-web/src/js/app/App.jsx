import React, {useState} from "react";
import ReactDOM from "react-dom"
import {Provider} from "react-redux";
import DarkModeToggle from "react-dark-mode-toggle";

import {WordsPageConnected} from "../words/WordsPage"
import reduxStore from "../store/ReduxStore";
import {BrowserRouter, Link, Route, Switch} from "react-router-dom";
import {createBrowserHistory} from "history";
import {ArticlesPageConnected} from "../articles/ArticlesPage";
import {
    AppBar, Button,
    ButtonGroup,
    Container, Divider,
    FormGroup, Grid,
    IconButton,
    Menu,
    MenuItem,
    Toolbar,
    Typography
} from "@mui/material";

import * as styles from "./App.scss"

const App = ({}) => {
    const [darkMode, setDarkMode] = useState(false);
    return (<React.Fragment>
        <Provider store={reduxStore}>
            <BrowserRouter history={createBrowserHistory()} basename={"#"}>
                <AppBar position="static">
                    <Toolbar>
                        <IconButton
                            size="large"
                            edge="start"
                            color="inherit"
                            aria-label="menu"
                            sx={{mr: 2}}
                        >
                        </IconButton>
                        <Typography variant="h6" component="div" sx={{flexGrow: 1}}>
                            Page Translator
                        </Typography>

                        <div>
                            <IconButton
                                size="small"
                                aria-haspopup="false"
                                color="inherit"
                                href={"#/"}
                            >Home
                            </IconButton>

                            <IconButton
                                size="small"
                                aria-haspopup="false"
                                color="inherit"
                                href={"#/words"}
                            >Words
                            </IconButton>

                            <IconButton
                                size="small"
                                aria-haspopup="false"
                                color="inherit"
                                href={"#/articles"}
                            >Articles
                            </IconButton>
                        </div>
                        <DarkModeToggle
                            onChange={setDarkMode}
                            checked={darkMode}
                            size={80}
                        />

                    </Toolbar>
                </AppBar>

                <Container className="p-3">
                    <Switch>
                        <Route path="/" exact={true}>
                            <Grid container spacing={2} rowSpacing={2}>
                                <Grid item spacing>
                                    <Button href="#/words">Words</Button>
                                </Grid>
                                <Grid item>
                                    <Button href="#/articles">Articles</Button>
                                </Grid>
                            </Grid>
                        </Route>
                        <Route path="/words">
                            <WordsPageConnected/>
                        </Route>
                        <Route path="/articles">
                            <ArticlesPageConnected/>
                        </Route>
                    </Switch>
                </Container>
            </BrowserRouter>
        </Provider>
    </React.Fragment>)
}

export default App

const wrapper = document.getElementById("container");
wrapper ? ReactDOM.render(<App/>, wrapper) : false
