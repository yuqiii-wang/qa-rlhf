import React, { useState, useContext } from 'react';
import { Row, Col } from 'react-bootstrap';
import './css/MiddleSeparationLine.css';

const MiddleSeparationLine = ({ onMidLeftLine, setOnMidLeftLine }) => {

    const handleOnClickMidLeftLine = () => {
        if (onMidLeftLine) {
            setOnMidLeftLine(false);
        } else {
            setOnMidLeftLine(true);
        }
    }
  
    return (
      <div className="resizable-line-wrapper">
        <div className="resizable-line" onClick={handleOnClickMidLeftLine}/>
        {onMidLeftLine ? (
            <div className="arrow">&#9664;</div> // left-arrow
        ) : (
            <div className="arrow">&#9654;</div> // right-arrow
        )}
    </div>
    );
  };

export default MiddleSeparationLine;
