import React, { useState, useEffect, useRef, useCallback } from "react";
import { Container, Row, Col, Form, Button, Card, Tab } from "react-bootstrap";
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";

const SummaryCard = ({ initialSummary }) => {

    const [summary, setSummary] = useState(initialSummary);
    const [isEditing, setIsEditing] = useState(false);
    const [key, setKey] = useState('summary');

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
      };
    
      const handleSummaryChange = (event) => {
        setSummary(event.target.value);
      };

  return (
    <div>
      <Card.Body>
      {isEditing ? (
            <textarea
            value={summary}
            onChange={handleSummaryChange}
            style={{ width: '100%', height: '300px', fontFamily: 'monospace', padding: '10px', borderRadius: '5px' }}
            />
        ) : (
            <p
            customStyle={{ overflow: 'auto', textAlign: 'left' }}
            >
            {summary}
            </p>
        )}
      </Card.Body>
      <Card.Footer style={{ display: "flex", justifyContent: "flex-end" }}>
        <OverlayTrigger
          placement="top" // You can adjust the position: 'top', 'right', 'bottom', 'left'
          overlay={<Tooltip id="button-tooltip">Edit the summary.</Tooltip>}
        >
          <Button
            variant="primary"
            type="submit"
            style={{ display: "flex", marginLeft: "1%", marginRight: "1%" }}
            onClick={handleEditToggle}>
              {isEditing ? 'Save' : 'Edit'}
          </Button>
        </OverlayTrigger>
          </Card.Footer>
    </div>
  );
};

export default SummaryCard;
