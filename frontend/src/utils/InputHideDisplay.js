import React, { useState, useContext, useEffect, useRef, useCallback } from "react";
import { Container, Row, Col, Form, Button, Card, Spinner } from "react-bootstrap";

import "./css/MiddleSeparationLine.css";

const InputHideDisplay = ({setOnMidLeftLine}) => {

    return (
        <Button className="input-hide-display-container vertical-text border rounded" 
        onClick={() => setOnMidLeftLine(true)}>
            <p>
                Click to expand.
            </p>
        </Button>
    )
}

export default InputHideDisplay;