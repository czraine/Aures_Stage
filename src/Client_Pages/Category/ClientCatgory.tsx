import React, { useState, useEffect } from 'react'
import { Layout, Menu, Input } from 'antd';
import { Col, Row } from 'react-bootstrap';
import { Content } from 'antd/es/layout/layout';
import { CategoryItem } from './CategoryItem';

interface Category {
    id: any;
    name: any;
    image: any;
    userid: any;


}
function ClientCatgory() {
    const [cate, setCate] = useState<Category[]>([]);
    useEffect(() => {
        fetch(`http://localhost:5000/category`)
            .then(res => res.json())
            .then(json => setCate(json));
    }, []);
    return (
        <>
            <Layout className="site-layout">

                <Content className="site-layout-background content">


                    <Row md={2} xs={1} lg={3} className="product-list">
                        {cate.map(item => (
                            <Col key={item.id}>
                                <CategoryItem {...item} />
                            </Col>
                        ))}
                    </Row>
                </Content>
            </Layout>



        </>)
}

export default ClientCatgory