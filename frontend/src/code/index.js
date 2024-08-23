import React, { useState, useContext, useEffect, useRef, useCallback } from "react";
import { Container, Row, Col, Form, Button, Card, Spinner } from "react-bootstrap";
import CodeDetailComponent from "./CodeDetail";
import { GlobalAppContext } from "../GlobalAppContext";
import './css/CodeDetail.css';
import { CodeContextManager } from "./CodeContext";

const CodeComponent = () => {
    const { solutionLoading, detailResults, referenceCodeSepOffset } = useContext(GlobalAppContext)

  if (solutionLoading) {
    return (
        <Container style={{display: "flex", justifyContent: 'flex-center'}}>
            <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
        </Container>
    );
  }

  return (
    <Container className="code-card-container border rounded"
    style={{height: `${Math.min(35, 10+referenceCodeSepOffset)}rem`}}>
        <CodeContextManager>
        <CodeDetailComponent />
        </CodeContextManager>
    </Container>
  );
};

export default CodeComponent;
