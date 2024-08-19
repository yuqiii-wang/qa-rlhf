import React, { useContext, useState, useEffect } from 'react';
import { Container, Row, Col, Form, Spinner, Card } from 'react-bootstrap';
import { GlobalAppContext } from "../GlobalAppContext";

const ImageReferenceDetailComponent = () => {
    const {solutionLoading, referenceImageResults} = useContext(GlobalAppContext);
    const [localReferenceImageResults, setLocalReferenceImageResults] = useState([])
    
    useEffect(() => {
        if (referenceImageResults.length == 0) return; // If clicked is false, skip the effect

        console.log(localReferenceImageResults);


        const fetchData = async () => {
            setLocalReferenceImageResults(referenceImageResults);
        }
        fetchData();
                    
      }, [localReferenceImageResults]);

  return (
    <Container>
      {solutionLoading ? (
        <Row className="justify-content-md-center">
          <Col md="6">
            <Spinner animation="border" />
          </Col>
        </Row>
      ) : (
        <Row>
            <p>hhh</p>
          {localReferenceImageResults.map((image, index) => {
            <React.Fragment >
              <Col md="4" className="mb-3">
                <Card>
                  <Card.Img variant="top" src={image.src} />
                </Card>
              </Col>
              <Col md="12" className="text-center mb-3">
                <p>{image.name}</p>
              </Col>
            </React.Fragment>
        })}
        </Row>
      )}
    </Container>
  );
};

export default ImageReferenceDetailComponent;
