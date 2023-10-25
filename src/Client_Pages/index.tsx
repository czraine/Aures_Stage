import React, { useEffect, useState, useContext } from 'react';
import axios from "axios";
import {
    Input,
    InputNumber,
    Divider,
    Image,
    Menu,
    message,
    Modal,
    Rate,
    Skeleton,
    Spin,
    Table,
    Select,
    Tooltip,
    Typography,
    List,
} from "antd";
import { Button, Card } from "react-bootstrap"
import { useShoppingCart } from "../context/ShoppingCartContext"

import Header from './Header';
import { ShoppingCartOutlined } from '@ant-design/icons';
import './index.css';
interface Product {
    id: any;
    title: any;
    price: any;
    description: any;
    Catego: any;
    image: any;

}
function MainPage() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [singleP, setSingleP] = useState<any>({});
    const [list, setList] = useState([]);
    const [newItem, setNewItem] = useState(0);
    const [prod, setProd] = useState<Product[]>([]);
    const { Title } = Typography;
    const [Prodid, setProdid] = useState(0);
    const {

        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
    } = useShoppingCart();
    const [quantity, setQuant] = useState(0);

    const [Isadded, setIsadded] = useState(false);


    const onChange = (value: number) => {
        setQuant(value);
    };
    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setSingleP({});
    };
    const FetchSingleProduct = (id) => {
        axios.get(`http://localhost:5000/todos/${id}`).then((res) => {
            setSingleP(res.data);

        });
    };
    useEffect(() => {
        fetch('http://localhost:5000/todos')
            .then(res => res.json())
            .then((json) => setProd(json));

    }, []);
    const AddToCart = async e => {
        try {


            const body = { quantity, Prodid };
            const response = await fetch("http://localhost:5000/todos", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });
            setIsadded(!Isadded);


        } catch (err) {
            console.log("nope something wrong happend");
            console.error(err.message);
        }

    };
    return (
        <div className='clientPage' >
            <Header />
            {prod.length ? (
                <List
                    style={{ alignContent: 'center' }}
                    grid={{ gutter: 25, column: 3 }}
                    dataSource={prod}
                    renderItem={(item) => (
                        <Card className="h-100">
                            <Card.Img
                                variant="top"
                                src={item.image}
                                height="200px"
                                style={{ objectFit: "contain" }}
                            />
                            <Card.Body className="d-flex flex-column">
                                <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
                                    <span className="fs-2">{item.title}</span>
                                    <span className="ms-2 text-muted">{item.price}</span>
                                </Card.Title>
                                <Typography.Paragraph ellipsis={{ rows: 2, expandable: true, symbol: 'more' }} >{item.description}</Typography.Paragraph>
                                <div className="mt-auto">
                                    {quantity === 0 ? (
                                        <Button className="w-100" onClick={() => increaseCartQuantity(item.id)}>
                                            + Add To Cart
                                        </Button>
                                    ) : (
                                        <div
                                            className="d-flex align-items-center flex-column"
                                            style={{ gap: ".5rem" }}
                                        >
                                            <div
                                                className="d-flex align-items-center justify-content-center"
                                                style={{ gap: ".5rem" }}
                                            >
                                                <Button onClick={() => decreaseCartQuantity(item.id)}>-</Button>
                                                <div>
                                                    <span className="fs-3">{quantity}</span> in cart
                                                </div>
                                                <Button onClick={() => increaseCartQuantity(item.id)}>+</Button>
                                            </div>
                                            <Button
                                                onClick={() => removeFromCart(item.id)}
                                                variant="danger"
                                                size="sm"
                                            >
                                                Remove
                                            </Button>
                                        </div>
                                    )}
                                </div>
                            </Card.Body>
                        </Card>
                    )}
                />

            ) : (
                <Skeleton />
            )
            }
            < Modal
                title="Detail Product"
                open={isModalOpen}
                onCancel={handleCancel}
                footer={null}
            >
                {singleP?.id ? (
                    <>
                        <p>
                            <div style={{ display: "flex" }}>
                                <img src={singleP?.image} width="200px" />
                                <div style={{ flexDirection: "column" }}>
                                    <Title level={1}>{`${singleP?.price}$`} __</Title>

                                </div>
                                <div style={{ flexDirection: "column" }}>

                                    <Title level={4}>Quantity : </Title>
                                    <InputNumber
                                        onChange={onChange} defaultValue={0}
                                    />
                                    <Button style={{ marginTop: 20 }}
                                        onClick={() => {
                                            setProdid(singleP.id);
                                            //  AddToCart
                                        }}

                                    > Add to Cart </Button>
                                </div>
                            </div>
                        </p>
                        <Divider />
                        <p>
                            <Title level={2}>{singleP?.title}</Title>
                        </p>
                        <p>
                            <Title level={4}>{singleP?.Catego}</Title>
                        </p>
                        <p>{singleP?.description}</p>
                    </>
                ) : (
                    <Spin size="large" />
                )}
            </Modal>
        </div >

    )
}

export default MainPage;