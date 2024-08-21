import React, { useState, useEffect, useRef, useCallback } from "react";
import { Container, Row, Col, Form, Button, Card } from "react-bootstrap";
import CodeCard from "./CodeCard";

const CodeDetailComponent = ({ code }) => {

    const codeSnippet = `
    function helloWorld() {
      console.log("Hello, World!");
    }
  `;

  return (
        <CodeCard initialCode={codeSnippet} ></CodeCard>
  );
};

export default CodeDetailComponent;
