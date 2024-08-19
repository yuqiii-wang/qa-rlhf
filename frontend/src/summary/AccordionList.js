import React, { useState, useContext, useEffect, useRef, useCallback } from "react";
import { Accordion, Button, Container } from "react-bootstrap";
import AccordionContent from "./AccordionContent";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import axios from "axios";
import {GlobalAppContext} from "../GlobalAppContext";
import {extractResponseImages} from "../utils/ImageHandlingUtils"

const AccordionList = () => {
    const { summaryResults, solutionLoading,
        setSolutionLoading, setReferenceResults, setReferenceImageResults } = useContext(GlobalAppContext)
        const [clickedSolutionIdx, setClickedSolutionIdx] = useState(-1);

  useEffect(() => {
    if (clickedSolutionIdx == -1) {
        return;
    }
    const triggerLoadingSolution = async () => {
        let id = clickedSolutionIdx;
        try {
            setSolutionLoading(true);
            const response = await axios.post("http://127.0.0.1:5000/process/reference" + "?id=" + id, {
                data: "Your request data here",
            });
            setReferenceResults(response.data);
            if (response.data.zip_file != null) {
                const images = await extractResponseImages(response.data);
                setReferenceImageResults(oldImages => images);
            }
          } catch (error) {
            console.error("Error making POST request", error);
          }
          finally {
            setSolutionLoading(false);
          }
      };
    triggerLoadingSolution();
    setClickedSolutionIdx(-1);
  }, [clickedSolutionIdx]); // Dependency array controls when the effect runs

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
          onClick={() => setClickedSolutionIdx(item.id)}
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
