import React, {useState} from "react";
import { Accordion, ListGroup } from "react-bootstrap";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import axios from "axios";
import FollowUpQuestion from "./FollowUpQuestion";

function AccordionContent({ item }) {
    const [onAskFollowUpQuestion, setOnAskFollowUpQuestion] = useState(false);

  const handleRunRequest = async (id) => {
    try {
      const response = await axios.post("http://127.0.0.1:5000/process/edit" + "?id=" + id, {
        data: "Your request data here",
      });
    } catch (error) {
      console.error("Error making POST request", error);
    }
  };

  const handleRemoveRequest = async (id) => {
    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/process/remove" + "?id=" + id, {
          data: "Your request data here",
        }
      );
    } catch (error) {
      console.error("Error making POST request", error);
    }
  };

  const handleAskRequest = (id) => {
    setOnAskFollowUpQuestion(true);
  };

  return (
    <Accordion.Body class="align-items-start">
      <ListGroup as="ul" className="text-start">
        <li>Solution created date: {item.time}</li>
        <li as="li">History executions: {item.executions} times</li>
      </ListGroup>
      {onAskFollowUpQuestion ? (
        <FollowUpQuestion setOnAskFollowUpQuestion={setOnAskFollowUpQuestion}></FollowUpQuestion>
      ) : (
        <Container style={{ display: "flex", justifyContent: "flex-end", marginTop: "2%"}}>
        <OverlayTrigger
            placement="top" // You can adjust the position: 'top', 'right', 'bottom', 'left'
            overlay={<Tooltip id="button-tooltip">Ask a follow-up question under this solution.</Tooltip>}
          >
            <Button
              variant="primary"
              type="submit"
              onClick={() => setOnAskFollowUpQuestion(true)}
              style={{ display: "flex", marginLeft: "1%", marginRight: "1%" }}
            >
              Ask
            </Button>
          </OverlayTrigger>
          <OverlayTrigger
            placement="top" // You can adjust the position: 'top', 'right', 'bottom', 'left'
            overlay={<Tooltip id="button-tooltip">Run this solution.</Tooltip>}
          >
            <Button
              variant="primary"
              type="submit"
              onClick={() => handleRunRequest(item.id)}
              style={{ display: "flex", marginLeft: "1%", marginRight: "1%" }}
            >
              Run
            </Button>
          </OverlayTrigger>
          <OverlayTrigger
            placement="top" // You can adjust the position: 'top', 'right', 'bottom', 'left'
            overlay={<Tooltip id="button-tooltip">Delete this solution.</Tooltip>}
          >
            <Button
              variant="primary"
              type="submit"
              onClick={handleRemoveRequest}
              style={{ display: "flex", marginLeft: "1%", marginRight: "1%" }}
            >
              Delete
            </Button>
          </OverlayTrigger>
        </Container>)}
    </Accordion.Body>
  );
}

export default AccordionContent;
