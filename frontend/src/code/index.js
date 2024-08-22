import React, { useState, useContext, useEffect, useRef, useCallback } from "react";
import { Container, Row, Col, Form, Button, Card, Spinner } from "react-bootstrap";
import CodeDetailComponent from "./CodeDetail";
import { GlobalAppContext } from "../GlobalAppContext";

const CodeComponent = () => {
    const { solutionLoading, detailResults } = useContext(GlobalAppContext)

  const initialSize = { width: "100%", height: "60%" };
  const [boxSize, setBoxSize] = useState(initialSize);

  if (solutionLoading) {
    return (
        <Container style={{display: "flex", justifyContent: 'flex-center'}}>
            <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
        </Container>
    );
  }

  return (
    <Container className="border rounded" style={{height: "30%"}}>
        <CodeDetailComponent />
    </Container>
  );
};

export default CodeComponent;
