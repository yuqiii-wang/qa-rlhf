import React, { useState, useEffect, useRef, useCallback } from "react";
import { Container, Row, Col, Form, Button, Card, Tab, Tabs } from "react-bootstrap";

import CodeCard from "./CodeCard";
import SummaryCard from "./CodeSummaryCard";
import CodeErrorCard from "./CodeErrorCard";

const CodeDetailComponent = ({ code }) => {
    const [key, setKey] = useState('code');

    return (
        <div style={{ width: '100%', height:"100%" }}>
            <Tabs
                id="code-tabs"
                activeKey={key}
                onSelect={(k) => setKey(k)}
            >
                <Tab eventKey="code" title="Code">
                    <CodeCard code={code} />
                </Tab>
                <Tab eventKey="error" title="Error">
                    <CodeErrorCard />
                </Tab>
                <Tab eventKey="summary" title="Summary">
                    <SummaryCard />
                </Tab>
            </Tabs>
        </div>
    );
};

export default CodeDetailComponent;
