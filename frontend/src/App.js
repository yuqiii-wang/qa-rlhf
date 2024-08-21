import "./App.css";
import TopNavBar from "./TopNavBar";
import InputComponent from "./input";
import SummaryComponent from "./summary";
import ReferenceComponent from "./reference";
import CodeComponent from "./code";

import MiddleSeparationLine from "./utils/MiddleSep";
import React, { useState, useEffect, useRef, useCallback } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import { GlobalAppContext, GlobalAppContextManager } from "./GlobalAppContext";

function App() {
    const [onMidLeftLine, setOnMidLeftLine] = useState(true);
  const [leftColWidth, setLeftColWidth] = useState(4); // 4 out of 12 grid columns
  const [rightColWidth, setRightColWidth] = useState(8); // Remaining 8 out of 12 grid columns

  useEffect(() => {
    if (onMidLeftLine) {
      setLeftColWidth(4);
      setRightColWidth(8);
    } else {
        setLeftColWidth(2);
        setRightColWidth(10);
    }
  }, [onMidLeftLine]);

  return (
    <GlobalAppContextManager className="App">
      <TopNavBar />
      <Container fluid style={{ marginTop: "1%" }}>
        <Row>
          <Col xs={leftColWidth}>
          <div>
              <Row>
                <Col xs={10}>
                  <SummaryComponent />
                  <InputComponent />
                </Col>
                <Col xs={2}>
                  <MiddleSeparationLine onMidLeftLine={onMidLeftLine} 
                                        setOnMidLeftLine={setOnMidLeftLine} />
                </Col>
              </Row>
              </div>
          </Col>
          <Col xs={rightColWidth}>
            <ReferenceComponent />
            <CodeComponent />
          </Col>
        </Row>
      </Container>
    </GlobalAppContextManager>
  );
}

export default App;
