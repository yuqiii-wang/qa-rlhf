import React from "react";
import { Accordion, ListGroup } from "react-bootstrap";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import axios from "axios";

function AccordionContent({ item }) {

  const handleEditRequest = async (id) => {
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

  return (
    <Accordion.Body class="align-items-start">
      <ListGroup as="ul" className="text-start">
        <li>Solution created date: {item.time}</li>
        <li as="li">History executions: {item.executions} times</li>
      </ListGroup>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <OverlayTrigger
          placement="top" // You can adjust the position: 'top', 'right', 'bottom', 'left'
          overlay={<Tooltip id="button-tooltip">Edit this solution.</Tooltip>}
        >
          <Button
            variant="primary"
            type="submit"
            onClick={() => handleEditRequest(item.id)}
            style={{ display: "flex", marginLeft: "1%", marginRight: "1%" }}
          >
            Edit
          </Button>
        </OverlayTrigger>
        <OverlayTrigger
          placement="top" // You can adjust the position: 'top', 'right', 'bottom', 'left'
          overlay={<Tooltip id="button-tooltip">Remove this solution.</Tooltip>}
        >
          <Button
            variant="primary"
            type="submit"
            onClick={handleRemoveRequest}
            style={{ display: "flex", marginLeft: "1%", marginRight: "1%" }}
          >
            Remove
          </Button>
        </OverlayTrigger>
      </div>
    </Accordion.Body>
  );
}

export default AccordionContent;
