import React, {useEffect, useState} from "react";
import ReactDOM from "react-dom"
import {Provider} from "react-redux";
import DarkModeToggle from "react-dark-mode-toggle";

import {WordsPageConnected} from "../words/WordsPage"
import reduxStore from "../store/ReduxStore";
import {BrowserRouter, HashRouter, Link, Route, Switch} from "react-router-dom";
import {createBrowserHistory} from "history";
import {ArticlesPageConnected} from "../articles/ArticlesPage";
import {
    AppBar, Button,
    Container, Grid,
    IconButton,
    Toolbar,
    Typography
} from "@mui/material";

import * as styles from "./App.scss"
import PrivateRoute from "../common/PrivateRoute";
import {getCurrentUser} from "../utils/APIUtils";
import {ACCESS_TOKEN} from "../constants";
import NotFound from "../common/NotFound";
import Profile from "../profile/Profile";
import OAuth2RedirectHandler from "../oauth2/OAuth2RedirectHandler";
import AppHeader from "../common/AppHeader";
import Signup from "../signup/Signup";
import Login from "../login/Login";
import Alert from "react-s-alert";
import {Router} from "react-router";

const App = ({}) => {
    const [darkMode, setDarkMode] = useState(false);
    const [authenticated, setAuthenticated] = useState(false);
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(false);

    function handleLogout() {
        localStorage.removeItem(ACCESS_TOKEN);
        setAuthenticated(false);
        setCurrentUser(null)
        Alert.success("You're safely logged out!");
    }

    useEffect(() => {
        getCurrentUser()
            .then(response => {
                setCurrentUser(response);
                setAuthenticated(true);
                setLoading(false);
            })
            .catch(error => {
                setLoading(false);
            });
    }, [authenticated, loading])

    return (<React.Fragment>
        <Provider store={reduxStore}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton size="large" edge="start" color="inherit" aria-label="menu"/>
                    <Typography variant="h6" component="div" sx={{flexGrow: 1}}>Page Translator</Typography>

                    <div>
                        <IconButton href="/" size="small" color="inherit">Home</IconButton>
                    </div>
                    {authenticated && <div>
                        <IconButton href="/#words" size="small" color="inherit">Words</IconButton>
                        <IconButton href="/#articles" size="small" color="inherit">Articles</IconButton>
                    </div>}

                    <AppHeader authenticated={authenticated} onLogout={handleLogout}/>
                    <DarkModeToggle onChange={setDarkMode} checked={darkMode} size={80}
                    />

                </Toolbar>
            </AppBar>

            <Container className="p-3">
                <HashRouter basename="/">
                    <Switch>
                        <Route path="/words"> <WordsPageConnected/> </Route>
                        <Route path="/articles"> <ArticlesPageConnected/> </Route>

                        <PrivateRoute path="/" exact={true} authenticated={authenticated}>
                            <Grid container spacing={2} rowSpacing={2}>
                                <Grid item><Button href="#words">Words</Button></Grid>
                                <Grid item><Button href="#articles">Articles</Button></Grid>
                            </Grid>
                        </PrivateRoute>
                        <PrivateRoute path="/" exact={true} authenticated={!authenticated}>
                            Main Page
                        </PrivateRoute>

                        <PrivateRoute path="/profile" authenticated={authenticated} currentUser={currentUser}
                                      component={Profile}></PrivateRoute>
                        <Route path="/login"
                               render={(props) => <Login authenticated={authenticated} {...props} />}></Route>
                        <Route path="/signup"
                               render={(props) => <Signup authenticated={authenticated} {...props} />}></Route>
                        <Route path="/oauth2/redirect" component={OAuth2RedirectHandler}></Route>
                        <Route component={NotFound}></Route>
                    </Switch>
                </HashRouter>
            </Container>
        </Provider>
    </React.Fragment>)
}

export default App

const wrapper = document.getElementById("container");
wrapper ? ReactDOM.render(<App/>, wrapper) : false
