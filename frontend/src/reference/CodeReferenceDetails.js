import React, { useState, useContext } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import CodeReferenceDetail from './CodeReferenceDetail';
import {ReferenceContext, ReferenceContextManager} from './ReferenceContext';

const CodeReferenceDetails = ({newCode}) => {
    const { codeRows, setCodeRows } = useContext(ReferenceContext);

    const handleDeleteRow = (id) => {
        setCodeRows(codeRows.filter(row => row.id !== id));
    };
  
    return (
      <Container>
        {codeRows.map(row => (
          <CodeReferenceDetail
            key={row.id}
            code={row.code}
            onDelete={() => handleDeleteRow(row.id)}
          />
        ))}
      </Container>
    );
  };
  
  export default CodeReferenceDetails;
  