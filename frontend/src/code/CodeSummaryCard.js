import React, { useState, useContext, useEffect, useRef, useCallback } from "react";
import { Container, Row, Col, Form, Button, Card, Tab } from "react-bootstrap";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import { GlobalAppContext } from "../GlobalAppContext";

const SummaryCard = ({ initialSummary }) => {
    const { isSolutionConcludeDone } = useContext(GlobalAppContext)

    const [summary, setSummary] = useState(initialSummary);
    const [isEditing, setIsEditing] = useState(false);

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
      };
    
      const handleSummaryChange = (event) => {
        setSummary(event.target.value);
      };

  return (
    <div>
      <div className="code-card-content-container">
      {isEditing ? (
            <textarea
            value={summary}
            onChange={handleSummaryChange}
            style={{ width: '100%', height: '300px', fontFamily: 'monospace', padding: '10px', borderRadius: '5px' }}
            />
        ) : (
            <p
            style={{ overflow: 'auto', textAlign: 'left' }}
            >
            {summary}
            </p>
        )}
      </div>
      <Card.Footer style={{ display: "flex", justifyContent: "flex-end" }}>
                {!isSolutionConcludeDone ? (
                    <React.Fragment>
                            <Button
                                variant="primary"
                                type="submit"
                                disabled className="code-btn-container"
                                style={{ display: "flex", marginLeft: "1%", marginRight: "1%" }}
                                onClick={handleEditToggle}>
                                Edit
                            </Button>
                    </React.Fragment>
                ) : (
                    <React.Fragment>
                        <OverlayTrigger
                            placement="top" // You can adjust the position: 'top', 'right', 'bottom', 'left'
                            overlay={<Tooltip id="button-tooltip">Edit the code.</Tooltip>}
                        >
                            <Button
                                variant="primary"
                                type="submit"
                                style={{ display: "flex", marginLeft: "1%", marginRight: "1%" }}
                                onClick={handleEditToggle}>
                                {isEditing ? 'Save' : 'Edit'}
                            </Button>
                        </OverlayTrigger>
                    </React.Fragment>
                )}
            </Card.Footer>
    </div>
  );
};

export default SummaryCard;
