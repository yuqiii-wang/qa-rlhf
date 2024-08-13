import React, { useState, useEffect, useRef, useCallback } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";

const CodeDetailComponent = ( {codeDetail} ) => {

  return (
    <Container fluid>
      <Card
        style={{
          width: "100%",
          height: "100%",
          position: "relative"          
        }}
      >
        <p>{codeDetail}</p>
      </Card>
    </Container>
  );
};

export default CodeDetailComponent;
