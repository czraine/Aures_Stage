
import React, { useState } from 'react';
import { Form, Button, Container, Row, Col, InputGroup } from 'react-bootstrap';

function ClientModif() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const userInfos = JSON.parse(localStorage.getItem('userData'));
    const [uname, setUname] = useState(userInfos.user.username)
    const [password, setpassword] = useState(userInfos.user.password)
    const [fname, setfname] = useState(userInfos.user.fullname)
    const [pnmbr, setpnmbr] = useState(userInfos.user.phonenumber)
    const [mail, setmail] = useState(userInfos.user.mail)
    const [adress, setadress] = useState(userInfos.user.address)
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e) => {

        e.preventDefault();
        try {
            setLoading(true);
            // Simulate an API call to update the user's data
            await new Promise((resolve) => setTimeout(resolve, 1000));
            setLoading(false);
            // Show a success message
            alert('Profile updated successfully');
        } catch (error) {
            setLoading(false);
            // Show an error message
            alert('An error occurred while updating your profile');
        }
    };

    return (
        <Container className="mt-5">
            <Row>
                <Col md={{ span: 6, offset: 3 }}>
                    <h2>Edit Profile</h2>
                    <Form onSubmit={handleSubmit}>

                        <Form.Group controlId="formEmail">
                            <Form.Label>UserName</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter UserName"
                                value={uname}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formPassword">
                            <Form.Label>Password</Form.Label>
                            <InputGroup>
                                <Form.Control
                                    type={showPassword ? 'text' : 'password'}
                                    placeholder="Enter Password"
                                    value={password}
                                    onChange={(e) => setpassword(e.target.value)}
                                    required
                                />
                                <InputGroup.Text>
                                    <Button
                                        variant="link"
                                        onClick={() => setShowPassword(!showPassword)}
                                    >
                                        {showPassword ? 'Hide' : 'Show'}
                                    </Button>
                                </InputGroup.Text>
                            </InputGroup>
                        </Form.Group>
                        <Form.Group controlId="formEmail">
                            <Form.Label>Full Name</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter your full name"
                                value={fname}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Form.Group controlId="formEmail">
                            <Form.Label>PhoneNumber</Form.Label>
                            <Form.Control
                                type="number"
                                placeholder="Enter Phone Number"
                                value={pnmbr}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formName">
                            <Form.Label>Mail</Form.Label>
                            <Form.Control
                                type="email"
                                placeholder="Enter Mail"
                                value={mail}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </Form.Group>
                        <Form.Group controlId="formName">
                            <Form.Label>Address</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter Address"
                                value={adress}
                                onChange={(e) => setName(e.target.value)}
                                required
                            />
                        </Form.Group>

                        <Button variant="outline-primary" type="submit" disabled={loading}>
                            Save
                        </Button>
                    </Form>
                </Col>
            </Row>
        </Container >
    );
};






export default ClientModif








