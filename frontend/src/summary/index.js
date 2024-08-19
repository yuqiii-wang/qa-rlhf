import React from "react";
import { Container, Card } from "react-bootstrap";
import SummaryCard from "./SummaryCard";

const SummaryComponent = () => {

  return (
    <Container fluid >
      <Card 
        style={{
          marginTop: "1%",
          marginBottom: "1%",
        }}
      >
        <SummaryCard
        />
      </Card>
    </Container>
  );
};

export default SummaryComponent;
