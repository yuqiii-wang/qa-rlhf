import React, { useState, useContext, useEffect, useRef, useCallback } from "react";
import { Container, Row, Col, Form, Button, InputGroup, Card } from "react-bootstrap";

import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import { handleRunRequest } from "./GlobalBackendRequests";
import { GlobalAppContext } from "../GlobalAppContext";

const HomeComponents = {
    ASK: 'ask',
    SUMMARY: 'summary',
    REFERENCE: 'reference',
    CODE: 'code',
  };

const RunSolutionButton = ({onComponent}) => {
    const { referenceResults, referenceImageResults, solutionId, isSolutionShowDone,
        setExecutionLoading, referenceCodeSepOffset } = useContext(GlobalAppContext);

    return (
        <OverlayTrigger
            placement="top" // You can adjust the position: 'top', 'right', 'bottom', 'left'
            overlay={<Tooltip id="button-tooltip">Run this solution. This outputs relevant logs.</Tooltip>}
        >
            <Button
                className={onComponent === HomeComponents.REFERENCE && "reference-run-btn-item"}
                variant="primary"
                type="submit"
                onClick={() => handleRunRequest(solutionId)}
                hidden={!isSolutionShowDone ? true : false}
                style={onComponent !== HomeComponents.SUMMARY ? ({
                    position: "absolute",
                    top: `${Math.max(3.2, 28 - referenceCodeSepOffset)}rem`
                })
            : ({
                marginRight: "1%"
            })}
            >
                Run
            </Button>
        </OverlayTrigger>
    )
}

export { RunSolutionButton };