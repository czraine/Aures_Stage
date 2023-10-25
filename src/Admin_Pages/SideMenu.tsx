import {
    AppstoreOutlined,
    ShopOutlined,
    ShoppingCartOutlined,
    UserOutlined,
} from "@ant-design/icons";
import { useEffect, useState } from "react";
import { Route, Routes, useLocation, useNavigate } from "react-router-dom";
import { Container, Row, Col, Navbar, Nav } from "react-bootstrap";
import "./App.css";
import AdminPage from "./AdminPage";
import App from "../App";
import Categ from "../Categories";
import Commande from "../Commande";
import { message } from "antd";
import DashboardCrypto from "./dashboard";

function SideMenu() {
    const location = useLocation();
    const [selectedKeys, setSelectedKeys] = useState("/");

    useEffect(() => {
        const pathName = location.pathname;
        setSelectedKeys(pathName);
        message.success(pathName);
    }, [location.pathname]);

    return (
        <Container fluid>
            <Row>
                <Col sm={2} className="sidebar">
                    <Navbar expand="lg" bg="dark" variant="dark" className="flex-column">
                        <Navbar.Brand href="#">
                            <img
                                src=""
                                alt=" Baa3333333 "
                                height={40}
                                width={200}
                            />
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="sidebar-nav" />
                        <Navbar.Collapse id="sidebar-nav">
                            <Nav className="flex-column">
                                <Nav.Link href="" className="sidebar-link">
                                    <AppstoreOutlined />
                                    Dashboard
                                </Nav.Link>
                                <Nav.Link href="/Admin/products" className="sidebar-link">
                                    <AppstoreOutlined />
                                    Products
                                </Nav.Link>
                                <Nav.Link href="Admin/customers" className="sidebar-link">
                                    <UserOutlined />
                                    Customers
                                </Nav.Link>
                                <Nav.Link href="/Admin/Category" className="sidebar-link">
                                    <ShopOutlined />
                                    Categories
                                </Nav.Link>
                                <Nav.Link href="/Admin" className="sidebar-link">
                                    <ShoppingCartOutlined />
                                    Orders
                                </Nav.Link>
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                </Col>
                <Col sm={10} className="content">
                    <div className="content-header">
                        <h2>Welcome to Your Dashboard</h2>
                    </div>
                    <div className="content-body">
                        <Routes>
                            <Route path="/" element={<DashboardCrypto />} />
                            <Route path="/Admin/products" Component={App} />
                            <Route path="../customers" element={<AdminPage />} />
                            <Route path="../Category" element={<Categ />} />
                            <Route path="../" element={<Commande />} />
                        </Routes>
                    </div>
                </Col>
            </Row>
        </Container>
    );
}

export default SideMenu;
