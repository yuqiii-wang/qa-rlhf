import React, { useState, useContext, useEffect, useRef, useCallback } from "react";
import { Accordion, Button, Container } from "react-bootstrap";
import AccordionContent from "./AccordionContent";
import axios from "axios";
import { GlobalAppContext } from "../GlobalAppContext";
import { extractResponseImages } from "../utils/ImageHandlingUtils"
import './css/SummaryCard.css';

const AccordionList = () => {
    const { summaryResults, solutionLoading,
        setSolutionLoading, setReferenceResults, setReferenceImageResults,
        setIsSolutionShowDone } = useContext(GlobalAppContext)
    const [selectSolutionIdx, setSelectSolutionIdx] = useState(-1);
    const [selectPrevSolutionIdx, setSelectPrevSolutionIdx] = useState(-1);

    useEffect(() => {
        const triggerLoadingSolution = async () => {
            if ( selectPrevSolutionIdx === selectSolutionIdx) {
                return;
            }
            let id = selectSolutionIdx;
            try {
                setSolutionLoading(true);
                const response = await axios.post("http://127.0.0.1:5000/process/reference" + "?id=" + id, {
                    data: "Your request data here",
                });
                setReferenceResults(response.data);
                if (response.data.zip_file !== null) {
                    const images = await extractResponseImages(response.data);
                    setReferenceImageResults(oldImages => images);
                }
            } catch (error) {
                console.error("Error making POST request", error);
            }
            finally {
                setSolutionLoading(false);
                setIsSolutionShowDone(true);
            }
        };
        triggerLoadingSolution();
        setSelectPrevSolutionIdx(selectSolutionIdx);
    }, [selectSolutionIdx]); // Dependency array controls when the effect runs

    return (
        <Container className="accordion-list-container">
            <Accordion defaultActiveKey={0}
            >
                {summaryResults.solutions.map((item, index) => (
                    <Accordion.Item
                        eventKey={index.toString()}
                        key={index}
                        onClick={() => setSelectSolutionIdx(index)}
                    >
                        <Accordion.Header>{item.name}</Accordion.Header>
                        <AccordionContent item={item} />
                    </Accordion.Item>
                ))}
            </Accordion>
        </Container>
    );
};

export default AccordionList;
