import React, { useEffect, useState } from 'react';
import { Layout, Menu, Input } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined, UserOutlined, VideoCameraOutlined, UploadOutlined } from '@ant-design/icons';
import { Col, Row } from 'react-bootstrap';
import { StoreItem } from './StoreItem';
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

function Products() {
  const [prod, setProd] = useState<Product[]>([]);
  const [collapsed, setCollapsed] = useState(true);
  const [allmenu, setAllmenu] = useState(false);

  const [category, setCategory] = useState(0);
  const toggleAllprod = () => {
    setAllmenu(!allmenu);
  };
  useEffect(() => {
    fetch(`http://localhost:5000/Products/${category}`)
      .then(res => res.json())
      .then(json => setProd(json));
  }, [category]);
  useEffect(() => {
    fetch('http://localhost:5000/todos')
      .then(res => res.json())
      .then(json => setProd(json));
  }, [allmenu]);
  const handleMenuClick = (selectedCategory: number) => {
    setCategory(selectedCategory);
  };

  return (
    <>

      <div className="search-container">
        <Input size='middle' className="search-baring" placeholder="Search" />
      </div>
      <Layout style={{ minHeight: '120vh' }}>

        {/* Sidebar */}
        <Sider trigger={null} collapsed={false} theme="light">
          <div className="logo" />
          <Menu theme="light" mode="inline" defaultSelectedKeys={['1']}>
            <Menu.Item key="1" onClick={() => toggleAllprod()} >
              all
            </Menu.Item>
            <Menu.Item key="2" onClick={() => handleMenuClick(1)} >
              electronics
            </Menu.Item>
            <Menu.Item key="3" onClick={() => handleMenuClick(2)} >
              jewelery
            </Menu.Item>
            <Menu.Item key="4" onClick={() => handleMenuClick(3)}>
              men's clothing
            </Menu.Item>
            <Menu.Item key="5" onClick={() => handleMenuClick(4)}>
              women's clothing
            </Menu.Item>
          </Menu>
        </Sider>

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

export default Products;
