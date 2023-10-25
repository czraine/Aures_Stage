
import React, { useEffect, useState } from 'react';
import { Layout, Menu, Input } from 'antd';
import { Col, Row } from 'react-bootstrap';
import { StoreItem } from '../Products/StoreItem';
import Slider from '../Slider';
import './../index.css';



const { Header, Sider, Content } = Layout;

interface Product {
    id: any;
    title: any;
    price: any;
    description: any;
    Catego: any;
    image: any;
}

function ProdsByCateg(id: any) {
    const [prod, setProd] = useState<Product[]>([]);
    const catId = parseInt(id.id);
    console.log("the id is " + id.id);
    const [category, setCategory] = useState(0);

    useEffect(() => {
        fetch(`http://localhost:5000/Products/${catId}`)
            .then(res => res.json())
            .then(json => setProd(json));
    }, [catId]);

    const handleMenuClick = (selectedCategory: number) => {
        setCategory(selectedCategory);
    };

    return (
        <>

            <div className="search-container">
                <Input size='middle' className="search-baring" placeholder="Search" />
            </div>
            <Layout style={{ minHeight: '120vh' }}>


                {/* Main Content */}
                <Layout className="site-layout">

                    <Content className="site-layout-background content">


                        <Row md={2} xs={1} lg={3} className="product-list">
                            {prod.map(item => (
                                <Col key={item.id}>
                                    <StoreItem {...item} />
                                </Col>
                            ))}
                        </Row>
                    </Content>
                </Layout>
            </Layout>
        </>

    );
}

export default ProdsByCateg;