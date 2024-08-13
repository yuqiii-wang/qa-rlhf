import React, { useState, useEffect, useRef, useCallback } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";

const ReferenceDetailComponent = ({referenceDetail}) => {

  return (
    <Container fluid>
      <Card
        style={{
          width: "100%",
          height: "100%",
        }}
      >
        <p>{referenceDetail}</p>
      </Card>
    </Container>
  );
};

export default ReferenceDetailComponent;
