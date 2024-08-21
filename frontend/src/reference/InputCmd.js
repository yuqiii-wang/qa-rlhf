import React, { useState, useContext, useEffect, useRef, useCallback } from "react";
import { Container, Row, Col, Form, Button, InputGroup, Card } from "react-bootstrap";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import ImageReferenceDetails from "./ImageReferenceDetails";
import CodeReferenceDetails from "./CodeReferenceDetails";
import { GlobalAppContext } from "../GlobalAppContext";
import {ReferenceContext, ReferenceContextManager} from './ReferenceContext';

const InputCmd = () => {
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
      <div className="align-items-center">
        <Row style={{display: "flex-end"}}>
        <Col xs={8}>
          <InputGroup>
            <Form.Control type="text" placeholder="Shell scripts, e.g., `grep 123456789 *.log`" />
            <Button variant="outline-secondary" onClick={handleArrowClick}>
              →
            </Button>
          </InputGroup>
        </Col>
        <Col xs={4}>
          <Button variant="primary" onClick={handleConcludeClick} style={{marginLeft:"1%", display: "flex-end"}}>
            Conclude
          </Button>
          <Button variant="primary" onClick={handleAddNotesClick} style={{marginLeft:"2%", display: "flex-end"}}>
            Add Notes
          </Button>
        </Col>
        </Row>
      </div>
  );
};

export default InputCmd;
