import React, { useState } from 'react';
import { Modal, Button, Form, Badge, Row } from 'react-bootstrap';
import Tooltip from "react-bootstrap/Tooltip";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import { InfoCircle } from 'react-bootstrap-icons';

const NameTagsPopup = ({ show, setShow }) => {
    const [name, setName] = useState('');
    const [tags, setTags] = useState([]);
    const [tagInput, setTagInput] = useState('');

    const handleClose = () => setShow(false);

    const handleTagInput = (e) => {
        setTagInput(e.target.value);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter' || e.key === ',') {
            e.preventDefault();
            if (tagInput.trim()) {
                setTags([...tags, tagInput.trim()]);
                setTagInput('');
            }
        }
    };

    const handleRemoveTag = (indexToRemove) => {
        setTags(tags.filter((_, index) => index !== indexToRemove));
    };

    const handleSubmit = () => {
        console.log('Name:', name);
        console.log('Tags:', tags.split(',').map(tag => tag.trim()));
        handleClose();
    };

    return (
        <Modal show={show} onHide={handleClose} centered>
            <Modal.Header closeButton>
                <Modal.Title>New Solution</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>

                    <Form.Group controlId="formName">
                        <Form.Label>Name</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter your name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group controlId="formTags" className="mt-3">
                        <Form.Label>
                            Tags
                            <OverlayTrigger
                                placement="right"
                                overlay={<Tooltip>Press "Enter" to input a tag. 
                                    The tags will be used for training to better map questions to solutions.</Tooltip>}
                            >
                                <InfoCircle className="ms-2" style={{ cursor: 'pointer' }} />
                            </OverlayTrigger>
                        </Form.Label>

                        <Form.Control
                            type="text"
                            placeholder="Enter tags and press Enter"
                            value={tagInput}
                            onChange={handleTagInput}
                            onKeyDown={handleKeyDown}
                        />
                        <div className="mt-2">
                            {tags.map((tag, index) => (
                                <Badge
                                    key={index}
                                    pill
                                    bg="secondary"
                                    className="me-1"
                                    onClick={() => handleRemoveTag(index)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    {tag} &times;
                                </Badge>
                            ))}
                        </div>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                <Button variant="primary" onClick={handleSubmit}>
                    Submit
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default NameTagsPopup;
