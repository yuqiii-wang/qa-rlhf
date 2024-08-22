import React, { useState, useContext, useEffect, useRef, useCallback } from "react";
import { Container, Row, Col, Form, Button, Card, Spinner } from "react-bootstrap";
import axios from "axios";
import { GlobalAppContext } from "../GlobalAppContext";

const FollowUpQuestion = ({ setOnAskFollowUpQuestion }) => {
    const { answerLoading, setAnswerLoading, setSummaryResults } = useContext(GlobalAppContext)

    return (
        <Row className="justify-content-start align-items-end" style={{ height: "", margin: "0" }}>
            <Col style={{ marginBottom: "2%" }}>
                <Form style={{ flexGrow: 1 }}>
                    <Form.Group controlId="exampleForm.ControlTextarea1" style={{ flexGrow: 1 }}>
                        <Form.Label>Ask A Follow-up Question</Form.Label>
                        <Form.Control as="textarea" rows={3} style={{ flexGrow: 1 }} />
                    </Form.Group>
                </Form>
                <Container style={{ display: "flex", justifyContent: "flex-end", marginTop: "2%" }}>
                    <Button variant="primary" type="submit" disabled={answerLoading}
                    style={{display: "flex", marginLeft: "1%", marginRight: "1%"}}>
                        {answerLoading ? (
                            <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                        ) : (
                            'Submit'
                        )}
                    </Button>
                    <Button variant="primary" type="submit" 
                    disabled={answerLoading} onClick={() => setOnAskFollowUpQuestion(false)}
                    style={{display: "flex", marginLeft: "1%", marginRight: "1%"}}>
                        {answerLoading ? (
                            <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                        ) : (
                            'Cancel'
                        )}
                    </Button>
                </Container>
            </Col>
        </Row>
    );
};

export default FollowUpQuestion;
