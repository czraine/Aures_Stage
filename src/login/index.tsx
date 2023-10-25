import React, { useEffect, useState } from 'react';
import './index.css';
import { Divider, Form, Input, InputNumber, Typography, message } from 'antd';
import { Button } from "react-bootstrap"

import Header from '../Client_Pages/Header';
function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [theid, setTheid] = useState(0);
    const [role, setRole] = useState(''); // Default role is 'user'
    const [isRegist, setIsRegist] = useState(false);
    const [Adduname, setAddUname] = useState('');
    const [Addpaswd, setAddPaswd] = useState('');
    const [Addfname, setAddFname] = useState('');
    const [Addpnmbr, setAddPnmbr] = useState<number>(0);
    const [Addadr, setAddAdr] = useState('');
    const [AddMail, setAddMail] = useState('');
    const [isEmailValid, setIsEmailValid] = useState(true);




    const handleLogin = async (e) => {

        try {
            const response = await fetch('http://localhost:5000/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            if (response.ok) {
                const data = await response.json();
                if (data.user.role === 'admin') {
                    message.success(data.user.id);
                    const userData = {
                        myid: data.user.id,
                        uname: data.user.username,
                        user: data.user,
                        therole: data.user.role
                    };

                    localStorage.setItem('userData', JSON.stringify(userData));
                    window.location.href = 'Admin';
                } else if (data.user.role === 'user') {
                    message.success(data.user.id);
                    const userData = {
                        myid: data.user.id,
                        uname: data.user.username,
                        user: data.user,

                        therole: data.user.role
                    };

                    localStorage.setItem('userData', JSON.stringify(userData));
                    window.location.href = '/'; // Redirect to user page
                }
            } else {
                message.error('Invalid mail or password');
            }
        } catch (error) {
            console.error(error);
        }
    };
    const handleSignUp = async (e) => {

        try {
            const role = "user";
            const body = {
                Adduname,
                Addpaswd,
                Addfname,
                Addpnmbr,
                AddMail,
                Addadr,
                role
            };
            console.log(body);
            const response = await fetch("http://localhost:5000/User", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });

            if (response.ok) {
                message.success(" Please Confirm Your account  ");
                setIsRegist(!isRegist);
            } else {
                message.error("Registration failed. Please try again.");
            }
        } catch (err) {
            console.log("Something went wrong during registration.");
            console.error(err.message);
        }
    }
    /* const handleLogin = async (e: any) => {
         await fetchData(username, password);
 
         if (username.length > 0 && password.length > 0) {
             message.success("login Successful");
             const userData = {
                 id: theid,
                 uname: username,
             };
 
             localStorage.setItem('userData', JSON.stringify(userData));
             // Redirect to the admin panel
             // Replace '/admin' with the actual path for the admin panel
             window.location.href = 'Admin';
 
         } else {
             message.error('Invalid username or password');
         }
     };*/
    const onChange = (value: number) => {
        setAddPnmbr(value);
    };
    return (
        <>
            {isRegist === false ? (
                <div className='loginP' >
                    <div className='content' >
                        <Form className='loginform' onFinish={handleLogin} >
                            <Typography.Title> Welcome Back!! </Typography.Title>
                            <Form.Item label='Mail' name={'myUsername'} rules={[{
                                required: true,
                                message: "please enter a valid Mail ",
                            },]}  >
                                <Input placeholder='Enter a mail' value={email} onChange={(e) => setEmail(e.target.value)} />
                            </Form.Item>
                            <Form.Item
                                rules={[{
                                    required: true,
                                    message: "please enter a valid Password ",
                                },]} label='Password' name={'myPassword'}  >
                                <Input.Password placeholder='Enter a Password' value={password} onChange={(e) => setPassword(e.target.value)} />
                            </Form.Item>
                            <div className="d-grid gap-2">
                                <Button variant='outline-dark' type='submit'    > Login </Button></div>
                            <Divider style={{ borderColor: "black" }} > or Sign Up with </Divider>
                            <div className="d-grid gap-2"> <Button variant='outline-dark' onClick={() => { setIsRegist(!isRegist); }}  > Sign Up </Button>  </div>
                        </Form>
                    </div>
                </div>
            ) : (

                <div className='loginP' >
                    <div className='content' >
                        <Form className='loginform' onFinish={handleSignUp} >
                            <Typography.Title> Sign Up </Typography.Title>
                            <Form.Item label='Username' name={'AddUsername'} rules={[{
                                required: true,
                                message: "please enter a valid UserName ",
                            },]}  >
                                <Input placeholder='Enter your UserName' value={Adduname} onChange={(e) => setAddUname(e.target.value)} />
                            </Form.Item>
                            <Form.Item
                                rules={[{
                                    required: true,
                                    message: "please enter a valid Password ",
                                },]} label='Password' name={'AddPassword'}  >
                                <Input.Password placeholder='Enter your Password' value={Addpaswd} onChange={(e) => setAddPaswd(e.target.value)} />
                            </Form.Item>

                            <Form.Item label='Full Name' name={'AddFullName'} rules={[{
                                required: true,
                                message: "please enter a valid Name ",
                            },]}  >
                                <Input placeholder='Enter your FullName' value={Addfname} onChange={(e) => setAddFname(e.target.value)} />
                            </Form.Item>

                            <Form.Item
                                rules={[{
                                    required: true,
                                    message: "please enter a valid Phone Number ",
                                },]} label='Phone Number' name={'Addphonenumber'}  >
                                <InputNumber placeholder='Enter your Password' size='large' value={Addpnmbr} onChange={onChange} />
                            </Form.Item>

                            <Form.Item label='Mail' name={'AddMail'}   >
                                <Input
                                    placeholder='Enter your Email'
                                    value={AddMail}
                                    onChange={(e) => {
                                        setAddMail(e.target.value);
                                        console.log(AddMail);
                                    }} />                            </Form.Item>

                            <Form.Item label='Adress' name={'AddAdress'} rules={[{
                                required: true,
                                message: "please enter a valid Address ",
                            },]}  >
                                <Input placeholder='Enter your Address' value={Addadr} onChange={(e) => setAddAdr(e.target.value)} />
                            </Form.Item>

                            <div className="d-grid gap-2">
                                <Button variant='outline-dark' type='submit'    > Sign Up </Button></div>
                            <Divider style={{ borderColor: "black" }} > or Login with </Divider>
                            <div className="d-grid gap-2"> <Button variant='outline-dark' onClick={() => { setIsRegist(!isRegist); }}  > Login in </Button>  </div>
                        </Form>
                    </div>
                </div>)}
        </>
    )
}

export default Login;