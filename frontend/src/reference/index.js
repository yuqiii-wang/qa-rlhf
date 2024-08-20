import React, {
  useState,
  useContext,
  useEffect,
  useRef,
  useCallback,
} from "react";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  Card,
  Spinner,
} from "react-bootstrap";
import ReferenceDetailComponent from "./ReferenceDetail";
import { GlobalAppContext } from "../GlobalAppContext";
import { ReferenceContextManager } from "./ReferenceContext";

const ReferenceComponent = () => {
  const { solutionLoading, detailResults } = useContext(GlobalAppContext);

  const initialSize = { width: "100%", height: "60%" };
  const [boxSize, setBoxSize] = useState(initialSize);

  return (
    <Container fluid>
        <ReferenceContextManager>
      {solutionLoading ? (
        <Spinner
          as="span"
          animation="border"
          size="sm"
          role="status"
          aria-hidden="true"
        />
      ) : (
        <Card
          style={{
            width: boxSize.width,
            height: boxSize.height,
            marginTop: "1%",
            marginBottom: "1%",
          }}
        >
          <Row>
            <Col style={{ marginLeft: "0" }}>
              <ReferenceDetailComponent />
            </Col>
          </Row>
        </Card>
      )}
      {/* <Card className="border-0" */}
      </ReferenceContextManager>
    </Container>
  );
};

export default ReferenceComponent;
