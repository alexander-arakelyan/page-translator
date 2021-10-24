import React, {useState} from "react";
import ReactDOM from "react-dom"
import {Provider} from "react-redux";
import DarkModeToggle from "react-dark-mode-toggle";

import {Button, ButtonGroup, Col, Container, Form, Nav, Navbar, NavDropdown, Row} from "react-bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"

import {WordsConnected} from "../words/Dict"
import reduxStore from "../store/ReduxStore";
import {BrowserRouter, Link, Route, Switch} from "react-router-dom";
import {createBrowserHistory} from "history";
import Articles from "../articles/Articles";

const App = ({}) => {
    const [isDarkMode, setIsDarkMode] = useState(() => false);
    return (<React.Fragment>
        <Provider store={reduxStore}>
            <BrowserRouter history={createBrowserHistory()} basename={"#"}>
                <Navbar bg="light" expand="lg">
                    <Container>
                        <Navbar.Brand href="/#">Page Translator</Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="me-auto">
                                <Nav.Link as={Link} to="/">Home</Nav.Link>
                                <Nav.Link as={Link} to="/words">Words</Nav.Link>
                                <Nav.Link as={Link} to="/articles">Articles</Nav.Link>
                                <NavDropdown title="More">
                                    <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                                    <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                                    <NavDropdown.Divider/>
                                    <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                                </NavDropdown>
                            </Nav>
                        </Navbar.Collapse>
                        <DarkModeToggle
                            onChange={setIsDarkMode}
                            checked={isDarkMode}
                            size={80}
                        />
                    </Container>
                </Navbar>

                <Container className="p-3">
                    <Row>
                        <Col>
                            <Switch>
                                <Route path="/" exact={true}>
                                    <Form>
                                        <ButtonGroup>
                                            <Button as={Link} to="/words">Words</Button>
                                        </ButtonGroup>
                                        <ButtonGroup>
                                            <Button as={Link} to="/articles">Articles</Button>
                                        </ButtonGroup>
                                    </Form>
                                </Route>
                                <Route path="/words">
                                    <WordsConnected/>
                                </Route>
                                <Route path="/articles">
                                    <Articles/>
                                </Route>
                            </Switch>
                        </Col>
                    </Row>
                </Container>
            </BrowserRouter>
        </Provider>
    </React.Fragment>)
}

export default App

const wrapper = document.getElementById("container");
wrapper ? ReactDOM.render(<App/>, wrapper) : false
