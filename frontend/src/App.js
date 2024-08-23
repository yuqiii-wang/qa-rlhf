import "./App.css";
import TopNavBar from "./TopNavBar";
import InputComponent from "./input";
import SummaryComponent from "./summary";
import ReferenceComponent from "./reference";
import CodeComponent from "./code";
import InputHideDisplay from "./utils/InputHideDisplay";
import ReferenceCodeSepLine from "./utils/ReferenceCodeSep";

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
        setLeftColWidth(1);
        setRightColWidth(11);
    }
  }, [onMidLeftLine]);

  return (
    <GlobalAppContextManager className="App">
      <TopNavBar />
      <Container fluid style={{ marginTop: "1%" }}>
        <Row>
          <Col lg={leftColWidth}>
              <Row>
                {onMidLeftLine ? (
                    <React.Fragment>
                        <Col xs={10}>
                  <SummaryComponent />
                  <InputComponent />
                </Col>
                <Col xs={2}>
                <MiddleSeparationLine onMidLeftLine={onMidLeftLine} 
                                      setOnMidLeftLine={setOnMidLeftLine} />
              </Col>
                    </React.Fragment>
                    
                ) : (
                    <React.Fragment>
                        <Col xs={8}>
                    <InputHideDisplay setOnMidLeftLine={setOnMidLeftLine}>
                    </InputHideDisplay>
                    </Col>
                    <Col xs={4}>
                    <MiddleSeparationLine onMidLeftLine={onMidLeftLine} 
                                          setOnMidLeftLine={setOnMidLeftLine} />
                  </Col>
                  </React.Fragment>
                )}
                
                
              </Row>
          </Col>
          <Col lg={rightColWidth}>
            <ReferenceComponent />
            <ReferenceCodeSepLine></ReferenceCodeSepLine>
            <CodeComponent />
          </Col>
        </Row>
      </Container>
    </GlobalAppContextManager>
  );
}

export default App;
