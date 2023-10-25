import React from "react";
import { useNavigate } from "react-router";
import './css/styles.css';

import { Container, Row, Col } from "react-bootstrap";

export default function Dashboard() {
    const navigate = useNavigate();

    //function to redirect when clicking create button
    const handleClickCreate = () => {
        navigate("/create");
    }

    //function to redirect when clicking lookup button
    const handleClickLookup = () => {
        navigate("/lookup");
    }

    return (
        <Container>
            <div className="dashboard">
                <h3>Hello! How can we help?</h3>
                <h4>You can create a new ticket, or look up an existing ticket using your email.</h4>
                <br />
                <Row>
                    <Col>
                        <span >
                            <button className="btn btn-primary"
                                style={{ marginRight: 12 }}
                                onClick={handleClickCreate}>
                                <i className="bi bi-ticket-detailed-fill" style={{ marginRight: 6 }}></i>
                                Create Ticket
                            </button>
                        </span>
                        <button className="btn btn-info"
                            onClick={handleClickLookup}>
                            <i className="bi bi-search" style={{ marginRight: 6 }}></i>
                            Lookup Ticket
                        </button>
                    </Col>
                </Row>
            </div>
        </Container>
    );
}