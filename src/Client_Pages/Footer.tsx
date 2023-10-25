import React from 'react';
import {
    FacebookOutlined,
    TwitterOutlined,
    InstagramOutlined,
    LinkedinOutlined,
    MailOutlined,
    PhoneOutlined,
    SendOutlined,
} from '@ant-design/icons';
import './index.css';
function Footer() {
    return (
        <>
            <div className="footer">
                <div className="container">
                    <div className="row">
                        <div className="col-md-6 col-lg-5 col-12">
                            <h3><span> Aures </span> technologie </h3>
                            <p>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Laborum ea quo ex ullam laboriosam magni totam, facere eos iure voluptate.</p>
                            <div className="d-flex footer-icons">
                                <FacebookOutlined className="me-3" />
                                <TwitterOutlined className="me-3" />
                                <InstagramOutlined className="me-3" />
                                <LinkedinOutlined />
                            </div>
                        </div>
                        <div className="col-md-6 col-lg-3 col-12">
                            <h5>Quick Links</h5>
                            <ul className="list-unstyled">
                                <li><a className="text-dark" href="/">Services</a></li>
                                <li><a className="text-dark" href="/">Portfolio</a></li>
                                <li><a className="text-dark" href="/">Contact Us</a></li>
                                <li><a className="text-dark" href="/">Services</a></li>
                                <li><a className="text-dark" href="/">Portfolio</a></li>
                            </ul>
                        </div>
                        <div className="col-md-6 col-lg-4 col-12">
                            <h5>Contact Information</h5>
                            <p><PhoneOutlined /> +216 87 634 098</p>
                            <p><MailOutlined /> bapete9319@touchend.com</p>
                            <p><SendOutlined /> Kebilli, Tunsis </p>
                        </div>
                    </div>
                </div>
            </div>
            <div className="last-footer">
                <p>Design By AURES </p>
            </div>
        </>
    );
}

export default Footer;
