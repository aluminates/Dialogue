import React, { useState } from "react";
import { Col, Container, Form, Row, Button } from "react-bootstrap"; // it is a template for a Form page
import { useSignupUserMutation } from "../services/appApi";
import { Link, useNavigate } from "react-router-dom";               // used for navigating/linking from one page to the other
import "./Signup.css";
import botImg from "../assets/bot.jpeg";

function Signup() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [name, setName] = useState("");
    const [signupUser, { isLoading, error }] = useSignupUserMutation();
    const navigate = useNavigate();
    //image upload states
    const [image, setImage] = useState(null);
    const [upladingImg, setUploadingImg] = useState(false);
    const [imagePreview, setImagePreview] = useState(null);

    function validateImg(e) {
        const file = e.target.files[0];
        if (file.size >= 1048576) {
            return alert("Max file size is 1 MB!");
        } else {
            setImage(file);
            setImagePreview(URL.createObjectURL(file));
        }
    }

    // CLOUDINARY !!
    async function uploadImage() {
        const data = new FormData();
        data.append("file", image);
        data.append("upload_preset", "gm7bq3nr"); 
        try {
            setUploadingImg(true);
            let res = await fetch("https://api.cloudinary.com/v1_1/dcckgggrr/image/upload", {
                method: "post",
                body: data,
            });
            const urlData = await res.json();
            setUploadingImg(false);
            return urlData.url;
        } catch (error) {
            setUploadingImg(false);
            console.log(error);
        }
    }

    async function handleSignup(e) {
        e.preventDefault();
        if (!image) return alert("Upload your profile picture!");
        const url = await uploadImage(image);
        console.log(url);
        // signup the user
        signupUser({ name, email, password, picture: url }).then(({ data }) => {
            if (data) {
                console.log(data);
                navigate("/chat");
            }
        });
    }

    return (
        <Container>       
            <Row>
                <Col md={7} className="d-flex align-items-center justify-content-center flex-direction-column">
                    <Form style={{ width: "80%", maxWidth: 500 }} onSubmit={handleSignup}>
                        <h1 className="text-center">Create an account!</h1>
                        <div className="pic-container">
                            <img src={imagePreview || botImg} className="profile-pic" />
                            <label htmlFor="image-upload" className="image-upload-label">
                                <i className="fas fa-plus-circle add-picture-icon"></i>
                            </label>
                            <input type="file" id="image-upload" hidden accept="image/png, image/jpeg" onChange={validateImg} />
                        </div>
                        {error && <p className="alert alert-danger">{error.data}</p>}
                        <Form.Group className="mb-3" controlId="formBasicName">
                            <Form.Label>Name : </Form.Label>
                            <Form.Control type="text" placeholder="Enter your name." onChange={(e) => setName(e.target.value)} value={name} />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Email address : </Form.Label>
                            <Form.Control type="email" placeholder="Enter your email ID." onChange={(e) => setEmail(e.target.value)} value={email} />
                            <Form.Text className="text-muted">Your email ID will not be shared.</Form.Text>
                        </Form.Group>

                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Password : </Form.Label>
                            <Form.Control type="password" placeholder="Enter your password." onChange={(e) => setPassword(e.target.value)} value={password} />
                        </Form.Group>
                        <Button variant="warning" type="submit">
                            {upladingImg || isLoading ? "Signing you up..." : "Sign Up"}
                        </Button>
                        <div className="py-4">
                            <p className="text-center">
                                Already have an account? <Link to="/login">Login now!</Link>
                            </p>
                        </div>
                    </Form>
                </Col>
                <Col md={5} className="bgsign"></Col>
            </Row>
        </Container>
    );
}

export default Signup;

//<Container> tag is used for wrapping the form contents
//md = {5} means that it is a medium device