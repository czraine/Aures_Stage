import { Button, Container, Nav, Navbar } from "react-bootstrap"
import { NavLink, useLocation } from "react-router-dom"
import {
    UserOutlined
} from '@ant-design/icons';
import { useShoppingCart } from "../context/ShoppingCartContext"
import './header.css'; // Import your CSS file for styling
import { useEffect } from "react";
import { Avatar, Dropdown, message } from "antd";
import type { MenuProps } from 'antd';

function Header() {
    const { openCart, cartQuantity } = useShoppingCart()
    const isLoggedIn = !!localStorage.getItem('userData');

    const location = useLocation(); // Get the current location from React Router

    const items: MenuProps['items'] = [
        {
            key: '1',
            label: (
                <Button variant="outline-dark" onClick={() => {
                    window.location.href = "/Settings";

                }}> Profile  </Button>
            ),
        },
        {
            key: '2',
            label: (
                <Button variant="outline-dark" onClick={() => {
                    window.location.href = "/";
                    localStorage.removeItem('userData');
                }}> logout  </Button>
            ),
        },

    ];
    return (
        <div className={`header `}>
            <Navbar fixed="top" className="bg-white shadow-sm mb-3">
                <Navbar.Brand href="#">      <img src="https://datasym.co.uk/wp-content/uploads/2017/09/aures-Logo.png" alt=" Baa3333333 " height={40} width={200} />
                </Navbar.Brand>

                <Container>
                    <Nav className="me-auto">
                        <Nav.Link to="/" as={NavLink}>
                            Home
                        </Nav.Link>
                        <Nav.Link to="/product" as={NavLink}>
                            Products
                        </Nav.Link>
                        <Nav.Link to="/Category" as={NavLink}>
                            Categories
                        </Nav.Link>
                        {isLoggedIn && (
                            <Nav.Link to="/Mycomands" as={NavLink}>
                                my comands
                            </Nav.Link>
                        )}
                    </Nav>
                    {isLoggedIn ? (
                        <div className="me-2">
                            <div onClick={() => message.success('Avatar clicked')}>
                                <Dropdown menu={{ items }} placement="bottomRight" arrow>
                                    <Avatar style={{ backgroundColor: 'darkred' }} icon={<UserOutlined />} />
                                </Dropdown>
                            </div>
                        </div>


                    ) : (
                        <Button variant="outline-dark" onClick={() => {
                            window.location.href = "login";
                        }}> login  </Button>

                    )}
                    {cartQuantity > 0 && (
                        <Button
                            onClick={openCart}
                            style={{ width: "3rem", height: "3rem", position: "relative" }}
                            variant="outline-primary"
                            className="rounded-circle"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 576 512"
                                fill="currentColor"
                            >
                                <path d="M96 0C107.5 0 117.4 8.19 119.6 19.51L121.1 32H541.8C562.1 32 578.3 52.25 572.6 72.66L518.6 264.7C514.7 278.5 502.1 288 487.8 288H170.7L179.9 336H488C501.3 336 512 346.7 512 360C512 373.3 501.3 384 488 384H159.1C148.5 384 138.6 375.8 136.4 364.5L76.14 48H24C10.75 48 0 37.25 0 24C0 10.75 10.75 0 24 0H96zM128 464C128 437.5 149.5 416 176 416C202.5 416 224 437.5 224 464C224 490.5 202.5 512 176 512C149.5 512 128 490.5 128 464zM512 464C512 490.5 490.5 512 464 512C437.5 512 416 490.5 416 464C416 437.5 437.5 416 464 416C490.5 416 512 437.5 512 464z" />
                            </svg>

                            <div
                                className="rounded-circle bg-danger d-flex justify-content-center align-items-center"
                                style={{
                                    color: "white",
                                    width: "1.5rem",
                                    height: "1.5rem",
                                    position: "absolute",
                                    bottom: 0,
                                    right: 0,
                                    transform: "translate(25%, 25%)",
                                }}
                            >
                                {cartQuantity}
                            </div>
                        </Button>
                    )}
                </Container>
            </Navbar>
        </div>
    )
}
export default Header