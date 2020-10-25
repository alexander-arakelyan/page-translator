import React, { Component } from "react";
import ReactDOM from "react-dom"
import { Container, Row, Col } from "react-bootstrap"

class App extends Component {
    render () {
        return (<div>
            <Container>
            App Main
                <Row>
                    <Col>
                        App...
                    </Col>
                </Row>
            </Container>
        </div>)
    }
}

export default App

const wrapper = document.getElementById("container");
wrapper ? ReactDOM.render(<App />, wrapper) : false

