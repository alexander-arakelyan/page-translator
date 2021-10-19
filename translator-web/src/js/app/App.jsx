import React, {Component} from "react";
import ReactDOM from "react-dom"
import {Provider} from "react-redux";

import {Col, Container, Row} from "react-bootstrap"
import "bootstrap/dist/css/bootstrap.min.css"

import {WordsConnected} from "../dict/Dict"
import reduxStore from "../store/ReduxStore";

class App extends Component {
    render() {
        return (<React.Fragment>
            <Provider store={reduxStore}>
                <Container className="p-3">
                    <h3 className="header">App Main Header</h3>
                    <Row>
                        <Col>
                            <h4>App...</h4>
                        </Col>
                    </Row>
                    <Row>
                        <Col>
                            <WordsConnected/>
                        </Col>
                    </Row>
                </Container>
            </Provider>
        </React.Fragment>)
    }
}

export default App

const wrapper = document.getElementById("container");
wrapper ? ReactDOM.render(<App/>, wrapper) : false
