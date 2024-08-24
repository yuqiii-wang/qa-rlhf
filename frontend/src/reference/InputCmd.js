import React, { useState, useContext, useEffect, useRef, useCallback } from "react";
import { Container, Row, Col, Form, Button, InputGroup, Card } from "react-bootstrap";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import ImageReferenceDetails from "./ImageReferenceDetails";
import CodeReferenceDetails from "./CodeReferenceDetails";
import { GlobalAppContext } from "../GlobalAppContext";
import { ReferenceContext, ReferenceContextManager } from './ReferenceContext';
import './css/ReferenceDetail.css';

const InputCmd = () => {
    const { isSolutionShowDone, isSolutionRunning,
        setExecutionLoading, setIsSolutionConcludeDone } = useContext(GlobalAppContext);
    const { codeRows, setCodeRows } = useContext(ReferenceContext);


    const handleArrowClick = () => {
        // Define your arrow click logic here
        alert('Arrow clicked');
    };

    const handleConcludeClick = () => {
        // Define your conclude button logic here
        alert('Conclude clicked');
        setIsSolutionConcludeDone(true);
    };

    const handleAddNotesClick = () => {
        const newRow = ({
            id: codeRows.length + 1, code: '# Double click this area to edit. \
                                                    \n# You can add your comments here as free text that will be referenced by AI.' });

        setCodeRows(codeRows => [...codeRows, newRow]);
    };


    return (
        <Container className="reference-input-container">
            <Row className="align-items-right">
                <Col xs={8}>
                    <InputGroup>
                        <Form.Control type="text" placeholder="Shell scripts, e.g., `grep 123456789 *.log`" />
                        <Button variant="outline-secondary" onClick={handleArrowClick}
                            disabled={!isSolutionShowDone || isSolutionRunning ? true : false}
                            className={!isSolutionShowDone || isSolutionRunning ? "reference-input-btn-container" : ""}>
                            →
                        </Button>
                    </InputGroup>
                </Col>
                <Col className="d-flex justify-content-end">
                    <React.Fragment>
                        <Button variant="primary" onClick={handleConcludeClick}
                            disabled={!isSolutionShowDone || isSolutionRunning ? true : false}
                            className={!isSolutionShowDone || isSolutionRunning ? "reference-input-btn-container" : ""}>
                            Conclude
                        </Button>
                        <Button variant="primary" onClick={handleAddNotesClick} style={{ marginLeft: "2%" }}
                            disabled={!isSolutionShowDone || isSolutionRunning ? true : false}
                            className={!isSolutionShowDone || isSolutionRunning ? "reference-input-btn-container" : ""}>                                Add
                        </Button>
                    </React.Fragment>
                </Col>
            </Row>
        </Container>
    );
};

export default InputCmd;
