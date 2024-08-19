import React, { useState } from 'react';
import { Container } from "react-bootstrap";
import Draggable from "react-draggable";


const InputSummarySep = () => {
    const [position, setPosition] = useState({ x: 0, y: 0 });

const handleDrag = (e, data) => {
  setPosition({ x: data.x, y: data.y });
};

return (
  <Container fluid style={{ position: "relative", }}>
    <Draggable axis="y" onDrag={handleDrag}>
      <div
        style={{
          height: "5px",
          width: "35%",
          backgroundColor: "grey",
          cursor: "ns-resize",
          position: "absolute",
          top: `${position.y}px`,
        }}
      />
    </Draggable>
    <div style={{ position: "absolute", top: "10px", left: "10px" }}>
        console.log({position.y})
    </div>
  </Container>
);
};

export default InputSummarySep;
