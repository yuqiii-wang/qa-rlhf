import React, { useState, useEffect, useRef, useCallback } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import AccordionList from "./AccordionList";

const SummaryCard = ({ summaryResults }) => {
  if (Object.keys(summaryResults).length === 0) {
    return (
      <p style={{ position: "relative", padding: "20px" }}>
        History solutions and Advice will show here.
      </p>
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
      <AccordionList summaryResults={summaryResults} />
    </div>
  );
};

export default SummaryCard;
