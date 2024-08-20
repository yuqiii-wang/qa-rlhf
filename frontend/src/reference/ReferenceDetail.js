import React, { useState, useContext, useEffect, useRef, useCallback } from "react";
import { Container, Row, Col, Form, Button, InputGroup, Card } from "react-bootstrap";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import ImageReferenceDetails from "./ImageReferenceDetails";
import CodeReferenceDetails from "./CodeReferenceDetails";
import { GlobalAppContext } from "../GlobalAppContext";
import {ReferenceContext, ReferenceContextManager} from './ReferenceContext';

const ReferenceDetailComponent = () => {
    const { referenceResults, referenceImageResults, setExecutionLoading } = useContext(GlobalAppContext);
    const { codeRows, setCodeRows } = useContext(ReferenceContext);


  const handleArrowClick = () => {
    // Define your arrow click logic here
    alert('Arrow clicked');
  };

  const handleConcludeClick = () => {
    // Define your conclude button logic here
    alert('Conclude clicked');
  };

  const handleAddNotesClick = () => {
    const newRow = ({ id: codeRows.length+1, code: '# Double click this area to edit. \
                                                    \n# You can add your comments here as free text that will be referenced by AI.' });
    
    setCodeRows(codeRows => [...codeRows, newRow]);
  };


  return (
    <Container style={{ position: 'relative', width: '100%', padding: '20px' }}
    >
      {/* Main Content Area */}
      <Row className="flex-grow-1" style={{ marginBottom: '1rem' }}  >
        <Col>
        {referenceImageResults != null ? (
          <ImageReferenceDetails />
        ) : ("")}
          <CodeReferenceDetails/>
        </Col>
      </Row>
      {/* Input and Buttons Area */}
      <Row className="align-items-center">
        <Col xs={9}>
          <InputGroup>
            <Form.Control type="text" placeholder="Shell scripts, e.g., `grep 123456789 *.log`" />
            <Button variant="outline-secondary" onClick={handleArrowClick}>
              →
            </Button>
          </InputGroup>
        </Col>
        <Col xs={3}>
          <Button variant="primary" onClick={handleConcludeClick} style={{marginLeft:"1%"}}>
            Conclude
          </Button>
          <Button variant="primary" onClick={handleAddNotesClick} style={{marginLeft:"2%"}}>
            Add Notes
          </Button>
        </Col>
      </Row>
    </Container>
  );
};

export default ReferenceDetailComponent;
