import "./App.css";
import TopNavBar from "./topnavbar";
import InputComponent from "./input";
import SummaryComponent from "./summary";
import DetailComponent from "./details";
import InputSummarySep from "./utils/InputSummarySep"
import React, { useState, useEffect, useRef, useCallback } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";


function App() {
  const [summaryResults, setSummaryResults] = useState([]);
  const [detailResults, setDetailResults] = useState({"reference": null, "code": null});

  return (
    <div className="App">
      <TopNavBar />
      <Container fluid style={{ marginTop: "1%" }}>
        <Row style={{ margin: "0",  marginTop: "1%" }}>
          <Col md={4}>
            <SummaryComponent
              summaryResults={summaryResults}
              setDetailResults={setDetailResults}
            />
          </Col>
          <Col md={8}>
            <DetailComponent detailResults={detailResults}/>
          </Col>
        </Row>
        
        {/* <InputSummarySep /> */}

        <Row style={{ margin: "0", marginTop: "1%" }}>
          <Col md={4}>
            <InputComponent setSummaryResults={setSummaryResults} />
          </Col>
          <Col >
            
          </Col>
        </Row>
      </Container>
    </div>
  );
}

export default App;
