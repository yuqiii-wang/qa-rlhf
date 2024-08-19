import React, { useState, useContext, useEffect, useRef, useCallback } from "react";
import { Container, Row, Col, Form, Button, Card, Spinner } from "react-bootstrap";
import AccordionList from "./AccordionList";
import {GlobalAppContext} from "../GlobalAppContext";


const SummaryCard = () => {
    const { answerLoading, summaryResults } = useContext(GlobalAppContext)

    if (Object.keys(summaryResults).length === 0) {
    return (
      <p style={{ position: "relative", padding: "20px" }}>
        History solutions and Advice will show here.
      </p>
    );
  }

  if (answerLoading) {
    return (
        <Container style={{display: "flex", justifyContent: 'flex-center'}}>
            <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
        </Container>
    );
  }

  return (
    <div>
      <p style={{ position: "relative", padding: "20px" }}>
        {summaryResults.summary}
      </p>
      {Object.keys(summaryResults.solutions).length === 0 ? (
        <p style={{ position: "relative", padding: "20px" }}>
          This question has not yet seen history solution, you can create one to
          start.
        </p>
      ) : (
        <p></p>
      )}
      <AccordionList />
    </div>
  );
};

export default SummaryCard;
