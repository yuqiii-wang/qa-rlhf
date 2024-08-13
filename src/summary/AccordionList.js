import React, { useState, useEffect, useRef, useCallback } from "react";
import { Accordion, Button, Container } from "react-bootstrap";
import Spinner from "react-bootstrap/Spinner";
import AccordionContent from "./AccordionContent";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import axios from "axios";

const AccordionList = ({ summaryResults, setDetailResults }) => {

  const triggerLoadingDetail = async (id) => {
    try {
        const response = await axios.post("http://127.0.0.1:5000/process/detail" + "?id=" + id, {
            data: "Your request data here",
        });
        console.log(response);
        setDetailResults(response.data);
      } catch (error) {
        console.error("Error making POST request", error);
      }
  };

  const createNewSolution = () => {};

  const activeKey = "0"

  return (
      <Container fluid>
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
      <OverlayTrigger
        placement="top"
        overlay={
          <Tooltip id="button-tooltip">
            Create a new solution.
          </Tooltip>
        }
      >
        <Button
          variant="primary"
          type="submit"
          onClick={createNewSolution}
          style={{ marginBottom: "2%", marginRight: "1%"}}
          className="align-items-end"
        >
          Create
        </Button>
      </OverlayTrigger>
      </div>
          <Accordion defaultActiveKey={activeKey}>
      {summaryResults.solutions.map((item, index) => (
        <Accordion.Item
          eventKey={index.toString()}
          key={index}
          onClick={() => triggerLoadingDetail(item.id)}
        >
          <Accordion.Header>{item.name}</Accordion.Header>
          <AccordionContent item={item} />
        </Accordion.Item>
      ))}
    </Accordion>
    </Container>
  );
};

export default AccordionList;
