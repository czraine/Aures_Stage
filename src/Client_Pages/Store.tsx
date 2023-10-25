import React, { useEffect, useState } from 'react';
import { Layout, Menu, Input } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined, UserOutlined, VideoCameraOutlined, UploadOutlined } from '@ant-design/icons';
import { Col, Row } from 'react-bootstrap';
import Slider from './Slider';
import './index.css';
import { CategoryItem } from './Category/CategoryItem';

const { Header, Sider, Content } = Layout;

interface Product {
    id: any;
    title: any;
    price: any;
    description: any;
    Catego: any;
    image: any;
}

interface Category {
    id: any;
    name: any;
    image: any;
    userid: any;


}
function Store() {
    const [prod, setProd] = useState<Product[]>([]);
    const [collapsed, setCollapsed] = useState(true);
    const [allmenu, setAllmenu] = useState(false);
    const [workingHours, setWorkingHours] = useState({
        lundi: { debut: "", fin: "", number: "1" },
        Mardi: { debut: "", fin: "", number: "2" },
        Mercredi: { debut: "", fin: "", number: "3" },
        Jeudi: { debut: "", fin: "", number: "4" },
        Vendredi: { debut: "", fin: "", number: "5" },
        Samedi: { debut: "", fin: "", number: "6" },
        Dimanche: { debut: "", fin: "", number: "0" },
    });

    const [category, setCategory] = useState(0);
    const toggleAllprod = () => {
        setAllmenu(!allmenu);
    };
    async function fetchData() {
        try {
            const response = await fetch(`http://localhost:5000/Settings`, {
                method: "GET",
                headers: { "Content-Type": "application/json" },
            });

            if (!response.ok) {
                console.error('Failed to fetch data');
                return;
            }

            const data = await response.json();
            setWorkingHours(data.parametre.travailHoraire);
        } catch (error) {
            console.error('Error fetching data', error);
        }
    }
    useEffect(() => {
        fetchData();
    }, [])
    const [cate, setCate] = useState<Category[]>([]);
    useEffect(() => {
        fetch(`http://localhost:5000/category`)
            .then(res => res.json())
            .then(json => setCate(json));
    }, []);
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
    const getCurrentDay = () => {
        const daysOfWeek = ['Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi', 'Samedi'];
        const today = new Date().getDay();
        return daysOfWeek[today];
    };

    const currentDay = getCurrentDay();
    console.log("the current day is ", workingHours[currentDay.toLowerCase()].debut);
    return (
        <>

            <div className="search-container">
                <p className="right-align" >Working Hours for {currentDay}:</p>
                <p className="right-align" >Start At: {workingHours[currentDay.toLowerCase()].debut}</p>
                <p className="right-align" >Ends At: {workingHours[currentDay.toLowerCase()].fin}</p>

                <Input size='middle' className="search-baring" placeholder="Search" />
            </div>

            {/* Main Content */}
            <Layout className="site-layout">
                <Slider />

                <Content className="site-layout-background content">


                    <Row md={5} xs={4} lg={4} className="product-list">
                        {cate.map(item => (
                            <Col key={item.id}>
                                <CategoryItem {...item} />
                            </Col>
                        ))}
                    </Row>
                </Content>
            </Layout>
        </>

    );
}

export default Store;
