import "./App.css";
import TopNavBar from "./TopNavBar";
import InputComponent from "./input";
import SummaryComponent from "./summary";
import ReferenceComponent from "./reference";
import CodeComponent from "./code";

import InputSummarySep from "./utils/InputSummarySep"
import React, { useState, useEffect, useRef, useCallback } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { GlobalAppContext, GlobalAppContextManager} from "./GlobalAppContext";


function App() {

  return (
    <GlobalAppContextManager className="App">
      <TopNavBar />
      <Container fluid style={{ marginTop: "1%" }}>
        <Row>
          <Col md={4}>
            <SummaryComponent
            />
                        <InputComponent />

          </Col>
        
        {/* <InputSummarySep /> */}


      <Col md={8}>
            <ReferenceComponent />
            <CodeComponent />
          </Col>
          </Row>
          </Container>

    </GlobalAppContextManager>
  );
}

export default App;
