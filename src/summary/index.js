import React from "react";
import { Container, Card } from "react-bootstrap";
import SummaryCard from "./SummaryCard";

const SummaryComponent = ({ summaryResults, setDetailResults }) => {

  return (
    <Container fluid>
      <Card
        style={{
          marginTop: "1%",
          marginBottom: "1%",
        }}
      >
        <SummaryCard
          summaryResults={summaryResults}
          setDetailResults={setDetailResults}
        />
      </Card>
    </Container>
  );
};

export default SummaryComponent;
