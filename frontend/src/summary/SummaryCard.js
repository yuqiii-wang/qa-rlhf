import React, { useState, useContext, useEffect, useRef, useCallback } from "react";
import { Container, Row, Col, Form, Button, Card, Spinner } from "react-bootstrap";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import AccordionList from "./AccordionList";
import NameTagsPopup from "./CreateNewQAModal";
import {GlobalAppContext} from "../GlobalAppContext";


const SummaryCard = () => {
    const { answerLoading, summaryResults } = useContext(GlobalAppContext);
    const [showNewQAPopup, setShowNewQAPopup] = useState(false);

    const createNewQASolution = () => { 
        setShowNewQAPopup(true);
    };

    if (Object.keys(summaryResults).length === 0) {
    return (
      <p style={{ position: "relative", padding: "20px", opacity: "0.6" }}>
        History solutions and Advice will show here.
      </p>
    );
  }

  if (answerLoading) {
    return (
        <Container style={{display: "flex", justifyContent: 'flex-center'}}>
            <Spinner as="span" animation="border" size="sm" role="status" aria-hidden="true" />
        </Container>
    );
  }

  return (
    <div>
              <NameTagsPopup show={showNewQAPopup} setShow={setShowNewQAPopup}></NameTagsPopup>
      <p style={{ position: "relative", padding: "20px" }}>
        {summaryResults.summary}
      </p>
      {Object.keys(summaryResults.solutions).length === 0 ? (
        <p style={{ position: "relative", padding: "20px" }}>
          This question has not yet seen history solution, you can create one to
          start.
        </p>
      ) : (
        <p></p>
      )}
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
                        onClick={createNewQASolution}
                        style={{ marginBottom: "2%"}}
                        className="align-items-end"
                    >
                        Create
                    </Button>
                </OverlayTrigger>
            </div>
      <AccordionList />
    </div>
  );
};

export default SummaryCard;
