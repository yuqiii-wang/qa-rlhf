import React, {
    useState,
    useContext,
    useEffect,
    useRef,
    useCallback,
} from "react";
import {
    Container,
    Row,
    Col,
    Form,
    Button,
    Card,
    Spinner,
} from "react-bootstrap";
import ReferenceDetailComponent from "./ReferenceDetail";
import { GlobalAppContext } from "../GlobalAppContext";
import { ReferenceContextManager } from "./ReferenceContext";

const ReferenceComponent = () => {
    const { solutionLoading, detailResults, referenceCodeSepOffset } = useContext(GlobalAppContext);

    return (
        <Container className="reference-detail-container border rounded"
        style={{height: `${Math.max(6.5, 32-referenceCodeSepOffset)}rem` }}>
            <ReferenceContextManager>
                {solutionLoading ? (
                    <Spinner
                        as="span"
                        animation="border"
                        size="sm"
                        role="status"
                        aria-hidden="true"
                    />
                ) : (
                    <ReferenceDetailComponent />
                )}
                {/* <Card className="border-0" */}
            </ReferenceContextManager>
        </Container>
    );
};

export default ReferenceComponent;
