import React, { useState } from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { github } from 'react-syntax-highlighter/dist/esm/styles/hljs';
import shell from 'react-syntax-highlighter/dist/esm/languages/hljs/shell';

SyntaxHighlighter.registerLanguage('shell', shell);

const CodeReferenceDetail = ({ code, onDelete, language='shell' }) => {
  const [hover, setHover] = useState(false);
  const [isEditable, setIsEditable] = useState(false);
  const [currentCode, setCurrentCode] = useState(code);

  const handleDoubleClick = () => {
    setIsEditable(true);
  };

  const handleBlur = () => {
    setIsEditable(false);
  };

  return (
    <Row
      className="position-relative rounded"
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      <Col>
        {isEditable ? (
          <textarea
            value={currentCode}
            onChange={(e) => setCurrentCode(e.target.value)}
            onBlur={handleBlur}
            autoFocus
            className="w-100"
            style={{ fontFamily: 'monospace' }}
          />
        ) : (
          <div onDoubleClick={handleDoubleClick}>
            <SyntaxHighlighter
                language={language}
                style={github}
                customStyle={{ overflow: 'auto', textAlign: 'left' }}
              >
                {currentCode}
              </SyntaxHighlighter>
          </div>
        )}
      </Col>
      {hover && (
        <div
          className="position-absolute"
          style={{
            top: '5px',
            right: '10px',
            backgroundColor: 'rgba(255, 255, 255, 0.7)',
            borderRadius: '50%',
            width: '20px',
            height: '20px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
          }}
          onClick={onDelete}
        >
          <span style={{ fontWeight: 'bold', color: 'black' }}>&times;</span>
        </div>
      )}
    </Row>
  );
};

export default CodeReferenceDetail;

