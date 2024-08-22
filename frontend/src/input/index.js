import React, { useState, useContext, useEffect, useRef, useCallback } from "react";
import { Container, Row, Col, Form, Button, Card, Spinner } from "react-bootstrap";
import axios from "axios";
import FileUploadComponent from "./FileUpload";
import {GlobalAppContext} from "../GlobalAppContext";
import './css/Input.css'

const InputComponent = () => {

    const { answerLoading, isMainAskDone, setAnswerLoading, 
        setSummaryResults, setIsMainAskDone } = useContext(GlobalAppContext)

  const handlePostRequest = async () => {
    try {
        setAnswerLoading(true);
      const response = await axios.post("http://127.0.0.1:5000/process", {
        data: "Your request data here",
      });
      await new Promise(resolve => setTimeout(resolve, 200));
      setSummaryResults(response.data);
    } catch (error) {
      console.error("Error making POST request", error);
    } finally {
        setAnswerLoading(false);
        setIsMainAskDone(true);
    }
  };

  return (
    <Container className="input-card border rounded">
      <Row className="justify-content-start align-items-end" style={{ height: "", margin: "2%" }}>
        <Col style={{ marginBottom: "2%" }}>
              <Form style={{ flexGrow: 1 }}>
                <Form.Group controlId="exampleForm.ControlTextarea1" style={{ flexGrow: 1 }}>
                    {!isMainAskDone ? (
                        <Form.Label style={{fontWeight: 'bold', color: 'black'}}>Ask A Question</Form.Label>
                    ) : (
                        <Form.Label>Ask A Question</Form.Label>
                    )}
                  
                  <Form.Control as="textarea" rows={3} style={{ flexGrow: 1 }} />
                </Form.Group>
                <FileUploadComponent />
              </Form>
              <div style={{ display: "flex", justifyContent: "flex-end", marginTop:"1%" }}>
                <Button variant="primary" type="submit" onClick={handlePostRequest} disabled={answerLoading}>
                    {answerLoading ? (
                        <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
                        ) : (
                        'Submit'
                    )}
                </Button>
              </div>
        </Col>
      </Row>
    </Container>
  );
};

export default InputComponent;
