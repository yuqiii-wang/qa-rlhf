import React, { useState, useEffect, useRef, useCallback } from "react";
import { Card, Button, Tab, Tabs } from 'react-bootstrap';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { github } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import js from 'react-syntax-highlighter/dist/esm/languages/hljs/javascript';
import shell from 'react-syntax-highlighter/dist/esm/languages/hljs/shell';

SyntaxHighlighter.registerLanguage('javascript', js);
SyntaxHighlighter.registerLanguage('shell', shell);


const CodeCard = ({ initialCode, language = 'javascript' }) => {

    const [code, setCode] = useState(initialCode);
    const [isEditing, setIsEditing] = useState(false);
    const [key, setKey] = useState('code');

    const handleEditToggle = () => {
      setIsEditing(!isEditing);
    };
  
    const handleCodeChange = (event) => {
      setCode(event.target.value);
    };

    const handleExecutionRequest = () => {}

    return (
        <Card style={{ width: '100%' }}>
          <Tabs
          id="code-tabs"
          activeKey={key}
          onSelect={(k) => setKey(k)}
          className="mb-3"
        >
          <Tab eventKey="code" title="Code">
          <Card.Body>
            {isEditing ? (
              <textarea
                value={code}
                onChange={handleCodeChange}
                style={{ width: '100%', height: '300px', fontFamily: 'monospace', padding: '10px', borderRadius: '5px' }}
              />
            ) : (
              <SyntaxHighlighter
                language={language}
                style={github}
                customStyle={{ padding: '10px', borderRadius: '5px', overflow: 'auto', textAlign: 'left' }}
              >
                {code}
              </SyntaxHighlighter>
            )}
          </Card.Body>
          <Card.Footer>
          <div style={{ display: "flex", justifyContent: "flex-end" }}>
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
        <OverlayTrigger
          placement="top" // You can adjust the position: 'top', 'right', 'bottom', 'left'
          overlay={<Tooltip id="button-tooltip">Execute the code.</Tooltip>}
        >
          <Button
            variant="primary"
            type="submit"
            style={{ display: "flex", marginLeft: "1%", marginRight: "1%" }}
          >
            Execute
          </Button>
        </OverlayTrigger>
      </div>
          </Card.Footer>
          </Tab>
          <Tab eventKey="notes" title="Notes">
            <Card.Body>
              <p>Add your notes here...</p>
            </Card.Body>
          </Tab>
          </Tabs>
        </Card>
      );
};

export default CodeCard;
