import React, { useState, useEffect, useRef, useCallback } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import ReferenceDetailComponent from "./ReferenceDetail";
import CodeDetailComponent from "./CodeDetail";

const DetailComponent = ({ detailResults }) => {
  const initialSize = { width: "100%", height: "60%" };
  const [boxSize, setBoxSize] = useState(initialSize);

  if (detailResults == null) {
    detailResults.reference = "Solution detail will show here.";
    detailResults.code = "Solution code will show here.";
  }

  return (
    <Container fluid>
      <Card className="border-0"
        style={{
          width: boxSize.width,
          height: boxSize.height,
          marginTop: "1%",
          marginBottom: "1%",
        }}
      >
        <Row
        >
          <Col style={{marginLeft:"0"}}>
            <ReferenceDetailComponent referenceDetail={detailResults.reference} />
          </Col>
        </Row>
        <Row
          className="justify-content-start align-items-start"
        >
          <Col style={{}}>
            <CodeDetailComponent codeDetail={detailResults.code} />
          </Col>
        </Row>
      </Card>
    </Container>
  );
};

export default DetailComponent;
