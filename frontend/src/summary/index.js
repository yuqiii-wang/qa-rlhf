import React from "react";
import { Container, Card } from "react-bootstrap";
import SummaryCard from "./SummaryCard";
import './css/SummaryCard.css';

const SummaryComponent = () => {

    return (
        <Container className="summary-container border rounded">
                <SummaryCard />
        </Container>
    );
};

export default SummaryComponent;
