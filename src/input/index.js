import React, { useState, useEffect, useRef, useCallback } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import axios from "axios";
import FileUploadComponent from "./FileUpload";

const InputComponent = ({setSummaryResults}) => {

  const handlePostRequest = async () => {
    try {
      const response = await axios.post("http://127.0.0.1:5000/process", {
        data: "Your request data here",
      });
      setSummaryResults(response.data);
    } catch (error) {
      console.error("Error making POST request", error);
    }
  };

  return (
    <Container fluid>
      <Row className="justify-content-start align-items-end" style={{ height: "", margin: "0" }}>
        <Col style={{ marginBottom: "2%" }}>
          <Card style={{ position: "relative", padding: "20px" }}>
            <Card.Body style={{ padding: "0", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <Form style={{ flexGrow: 1 }}>
                <Form.Group controlId="exampleForm.ControlTextarea1" style={{ flexGrow: 1 }}>
                  <Form.Label>Ask A Question</Form.Label>
                  <Form.Control as="textarea" rows={5} style={{ flexGrow: 1 }} />
                </Form.Group>
                <FileUploadComponent />
              </Form>
              <div style={{ display: "flex", justifyContent: "flex-end", marginTop:"1%" }}>
                <Button variant="primary" type="submit" onClick={handlePostRequest}>
                  Submit
                </Button>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default InputComponent;
