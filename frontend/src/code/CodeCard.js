import React, { useState, useContext, useEffect, useRef, useCallback } from "react";
import { Card, Button, Tab, Tabs } from 'react-bootstrap';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { github } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import js from 'react-syntax-highlighter/dist/esm/languages/hljs/javascript';
import shell from 'react-syntax-highlighter/dist/esm/languages/hljs/shell';
import { GlobalAppContext } from "../GlobalAppContext";
import './css/CodeDetail.css'

SyntaxHighlighter.registerLanguage('javascript', js);
SyntaxHighlighter.registerLanguage('shell', shell);


const CodeCard = ({ initialCode, language = 'javascript' }) => {
    const { isSolutionConcludeDone } = useContext(GlobalAppContext)

    const [code, setCode] = useState("# Generated code will show here once concluded on logs.");
    const [isEditing, setIsEditing] = useState(false);

    const handleEditToggle = () => {
        setIsEditing(!isEditing);
    };

    const handleCodeChange = (event) => {
        setCode(event.target.value);
    };

    const handleExecutionRequest = () => { }

    return (
        <div>
            {isEditing ? (
                <textarea
                    value={code}
                    onChange={handleCodeChange}
                    style={{ width: '100%', fontFamily: 'monospace', padding: '10px', borderRadius: '5px' }}
                />
            ) : (
                <SyntaxHighlighter
                    language={language}
                    style={github}
                    customStyle={{ overflow: 'auto', textAlign: 'left' }}
                >
                    {code}
                </SyntaxHighlighter>
            )}
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
                            <Button
                                variant="primary"
                                type="submit"
                                disabled className="code-btn-container"
                                style={{ display: "flex", marginLeft: "1%", marginRight: "1%" }}
                            >
                                Execute
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
                    </React.Fragment>
                )}

            </Card.Footer>
        </div>
    );
};

export default CodeCard;
