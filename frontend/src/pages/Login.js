import React, { useContext, useState } from "react";
import { Col, Container, Form, Row, Button, Spinner } from "react-bootstrap";
import { useLoginUserMutation } from "../services/appApi";
import { Link, useNavigate } from "react-router-dom";
import "./Login.css";
import { AppContext } from "../context/appContext";

function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const { socket } = useContext(AppContext);
    const [loginUser, { isLoading, error }] = useLoginUserMutation();
    function handleLogin(e) {
        e.preventDefault();
        // login logic
        loginUser({ email, password }).then(({ data }) => {
            if (data) {
                // socket work
                socket.emit("new-user");
                // navigate to the chat
                navigate("/chat");
            }
        });
    }

    return (
        <Container>
            <Row>
                <Col md={5} className="bglogin"></Col>
                <Col md={7} className="d-flex align-items-center justify-content-center flex-direction-column">
                    <Form style={{ width: "80%", maxWidth: 500 }} onSubmit={handleLogin}> 
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            {error && <p className="alert alert-danger">{error.data}</p>}
                            <Form.Label>Email address : </Form.Label>
                            <Form.Control type="email" placeholder="Enter your email ID." onChange={(e) => setEmail(e.target.value)} value={email} required />
                            <Form.Text className="text-muted">Your email ID will not be shared.</Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password : </Form.Label>
                            <Form.Control type="password" placeholder="Enter your password." onChange={(e) => setPassword(e.target.value)} value={password} required />
                        </Form.Group>
                        <Button variant="warning" type="submit">
                            {isLoading ? <Spinner animation="grow" /> : "Login"} 
                        </Button>
                        <div className="py-4">
                            <p className="text-center">
                                Don't have an account? <Link to="/signup">Sign Up!</Link>
                            </p>
                        </div>
                    </Form>
                </Col>
            </Row>
        </Container>
    );
}

export default Login;

//<Spinner> is used for animation from react bootstrap and the type of animation is grow
//<Col md = {5} is for the login side of the page which has the form in it where the size of the flex box = space of 5 columns
//<Col md = {7} which gives the felx box size = space of 7 colums and d-flex = flex box
//<Row> and <Col> of a flex box
