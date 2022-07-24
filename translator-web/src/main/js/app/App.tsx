import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom"
import { Provider } from "react-redux";
import DarkModeToggle from "react-dark-mode-toggle";

import { lightTheme, darkTheme, setThemeNameStorage } from '../theme/Theme'

import { WordsPage } from "../words/WordsPage"
import reduxStore from "../store/ReduxStore";
import {
  AppBar,
  Button,
  Container,
  CssBaseline,
  Grid,
  IconButton, ThemeProvider,
  Toolbar,
  Typography
} from "@mui/material";
import { getCurrentUser } from "../utils/APIUtils";
import { ACCESS_TOKEN } from "../constants";
import { NotFound } from "../common/NotFound";
import { Profile } from "../profile/Profile";
import { OAuth2RedirectHandler } from "../oauth2/OAuth2RedirectHandler";
import AppHeader from "../common/AppHeader";
import { Signup } from "../signup/Signup";
import { Login } from "../login/Login";
import Alert from "react-s-alert";
import { getThemeNameStorage } from "../theme/Theme";
import { ArticlesPage } from "../articles/ArticlesPage";
import { Route } from "../route/Route";
import { RouteIconButton } from "../route/RouteIconButton";
import { TopicsPage } from "../topics/TopicsPage";
import { ExportPage } from "../export/ExportPage";

const App = ({}) => {
  const [ themeName, setThemeName ] = useState(getThemeNameStorage());
  const [ authenticated, setAuthenticated ] = useState(false);
  const [ currentUser, setCurrentUser ] = useState(null);
  const [ loading, setLoading ] = useState(false);

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
  }, [ authenticated, loading ])

  const currentTheme = themeName == "light" ? lightTheme : darkTheme;
  return (<React.Fragment>
    <ThemeProvider theme={ currentTheme }>
      <CssBaseline/>
      <Provider store={ reduxStore }>
        <AppBar position="static">
          <Toolbar>
            <IconButton size="large" edge="start" aria-label="menu"/>
            <Typography variant="h6" component="div" sx={ {flexGrow: 1} }>Page Translator</Typography>

            <div>
              <IconButton href="/" size="small" color="inherit">Home</IconButton>
            </div>
            { authenticated && <div>
                <RouteIconButton href="/#topics">Topics</RouteIconButton>
                <RouteIconButton href="/#articles">Articles</RouteIconButton>
                <RouteIconButton href="/#words">Words</RouteIconButton>
                <RouteIconButton href="/#export">Export</RouteIconButton>
            </div> }

            <AppHeader authenticated={ authenticated } onLogout={ handleLogout }/>
            <DarkModeToggle onChange={ (value) => {
              const name = value ? "dark" : "light";
              setThemeName(name)
              setThemeNameStorage(name);
            } } checked={ themeName != "light" } size={ 80 }
            />

          </Toolbar>
        </AppBar>

        <Container>
          <Route path="/#profile">
            { authenticated && <Profile currentUser={ currentUser }/> }
          </Route>
          <Route path={ /\/oauth2\/redirect.*/ } enabled={ !authenticated }>
            { !authenticated &&
            <OAuth2RedirectHandler location={ "/" } history={ "/" } authenticated={ authenticated }/> }
          </Route>
          <Route path="/#words">
            <WordsPage/>
          </Route>
          <Route path="/#articles"><ArticlesPage/></Route>
          <Route path="/#topics"><TopicsPage/></Route>
          <Route path="/#export"><ExportPage/></Route>
          <Route path="/#login" enabled={ !authenticated }>
            <Login authenticated={ authenticated } location={ location } history={ history }/>
          </Route>
          <Route path="/signup" enabled={ authenticated }>
            <Signup authenticated={ authenticated } location={ location } history={ history }/>
          </Route>
          <Route path="/">
            { authenticated && <Grid container spacing={ 2 } rowSpacing={ 2 }>
                <Grid item><Button href="#words">Words</Button></Grid>
                <Grid item><Button href="#articles">Articles</Button></Grid>
            </Grid> }
            { !authenticated && <Typography>Main Page</Typography> }
          </Route>
          <Route path="-">
            <NotFound/>
          </Route>
        </Container>
      </Provider>
    </ThemeProvider>
  </React.Fragment>)
}

export default App

const wrapper = document.getElementById("container");
wrapper ? ReactDOM.render(<App/>, wrapper) : false
