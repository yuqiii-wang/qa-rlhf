import React, { useState, useContext, useEffect, useRef, useCallback } from "react";
import { Container, Row, Col, Form, Button, InputGroup, Card } from "react-bootstrap";
import ImageReferenceDetails from "./ImageReferenceDetails";
import CodeReferenceDetails from "./CodeReferenceDetails";
import { GlobalAppContext } from "../GlobalAppContext";
import { ReferenceContext, ReferenceContextManager } from './ReferenceContext';
import InputCmd from "./InputCmd";
import {RunSolutionButton} from "../utils/GlobalSharedButtons"

import "./css/ReferenceDetail.css"

const ReferenceDetailComponent = () => {
    const { referenceResults, referenceImageResults, solutionId, isSolutionShowDone,
        setExecutionLoading, referenceCodeSepOffset } = useContext(GlobalAppContext);
    const { codeRows, setCodeRows } = useContext(ReferenceContext);

    const [hover, setHover] = useState(false);

    const handleAddNotesClick = () => {
        const newRow = ({
            id: codeRows.length + 1, code: '# Double click this area to edit. \
                                                    \n# You can add your comments here as free text that will be referenced by AI.' });

        setCodeRows(codeRows => [...codeRows, newRow]);
    };


    return (
        <div>
            <Container className="reference-detail-list-container"
                style={{ height: `${Math.max(3.2, 28 - referenceCodeSepOffset)}rem` }}
                onMouseEnter={() => setHover(true)}
                onMouseLeave={() => setHover(false)}>
                {referenceImageResults != null ? (
                    <ImageReferenceDetails className="mt-auto" />
                ) : ("")}
                <CodeReferenceDetails className="mt-auto" />
                <Container className="reference-run-btn-container">
                    {hover && (
                        <RunSolutionButton onComponent="reference"></RunSolutionButton>
                    )}
                </Container>
            </Container>
            <Container style={{ height: "12%", width: "100%" }}>
                <InputCmd ></InputCmd>
            </Container>
        </div>
    );
};

export default ReferenceDetailComponent;
