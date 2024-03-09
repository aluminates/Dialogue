import React from "react";
import { Row, Col, Button } from "react-bootstrap"; // react bootstrap is a frontend framework for templates
import { LinkContainer } from "react-router-bootstrap"; // using react router to nagivate pages
import "./Home.css";

function Home() {
    return (<body className = "align">
        <Row>
            <Col md={6} className="d-flex flex-direction-column align-items-center justify-content-center">
                <div class = "space">
                    <h1>Welcome to Dialogue!</h1>
                    <p>Dialogue is our MERN stack project based on a messaging app. We've developed a groupchat-based room environment along with private chats.</p>
                    <LinkContainer to="/signup"> 
                        <Button variant="warning">
                            Let's have a dialogue! 
                        </Button>
                    </LinkContainer>
                </div>
            </Col>
            <Col md={6} className="bghome"></Col>
        </Row>
        </body>
    );
}

export default Home;
