import React, { useEffect, useState } from 'react';
import {
    Button,
    Input,
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
    Form,
    List,
    Space,
    Alert,
} from "antd";
import './../App.css';
import { SearchOutlined } from '@ant-design/icons';
import moment from 'moment';

import axios from "axios";
import { BsXCircle, BsEye, BsCheckSquare } from "react-icons/bs";
type state = "en attente" | "accepté" | "refusé";

interface comands {
    id: any;
    userid: any;
    dateOrder: any;
    montantTotal: any;
    adresse: any;
    idclient: any;
    type: state;
}
interface comandsDetails {
    id: any;
    idCommand: any;
    nom: any;
    prixunitaire: any;
    quantite: any;

}
function MyComands() {

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [CommandDetails, setCommandDetails] = useState<comandsDetails[]>([]);

    const [IsUpdate, setIsupdate] = useState(false);
    const [Isadded, setIsadded] = useState(false);
    const [cammande, setCammande] = useState<comands[]>([]);
    const [singleP, setSingleP] = useState<any>({});
    const [Comid, setComid] = useState(0);
    const [UserId, setUserId] = useState(0);
    const [ClientId, setClientId] = useState(0);
    const [montantTotal, setmontantTotal] = useState(0);
    const [dateOrder, setDateOrder] = useState(new Date());
    const [adress, setAdress] = useState("");
    const [comtype, setComtype] = useState("en attente");
    const { Text } = Typography;
    const isLoggedIn = !!localStorage.getItem('userData');
    const userData = JSON.parse(localStorage.getItem('userData'));
    const [singleU, setSingleU] = useState<any>({});



    useEffect(() => {
        if (isLoggedIn) {
            fetch(`http://localhost:5000/MCommand/${userData.myid}`)
                .then(res => res.json())
                .then((json) => setCammande(json));
        }
    }, []);
    const FetchComand = (id) => {
        axios.get(`http://localhost:5000/Command/${id}`).then((res) => {
            setSingleP(res.data);
            message.success(singleP);

        });
    };
    const FetchComandsDetails = (id) => {
        FetchComand(id);
        message.success("the id is " + id);
        axios.get(`http://localhost:5000/thecommandetails/${id}`).then((res) => {
            setCommandDetails(res.data);

        });
    };
    useEffect(() => {
        setComid(singleP?.id || "");
        setClientId(singleP?.idclient || "");
        setDateOrder(singleP?.dateorder || "");
        setmontantTotal(singleP?.montantotal || "");
        setAdress(singleP?.adresse || "");
        setComtype(singleP?.type || "");

    }, [singleP]);
    const Detailscolumns = [
        {
            title: 'id',
            dataIndex: 'id',
            key: 'id',

        },
        {
            title: 'Name',
            dataIndex: 'nom',
            key: 'nom',

        },
        {
            title: 'Price',
            dataIndex: 'prixunitaire',
            key: 'prixunitaire',

        },
        {
            title: 'Quantite',
            dataIndex: 'quantite',
            key: 'quantite',

        },
    ];
    const columns = [
        {
            title: 'id',
            dataIndex: 'id',
            key: 'id',

        },

        {
            title: 'clientid',
            dataIndex: 'clientid',
            key: 'clientid',
        },

        {
            title: 'dateOrder',
            dataIndex: 'dateorder',
            key: 'dateorder',

        },

        {
            title: 'montantTotal',
            dataIndex: 'montantotal',
            key: 'montantotal',

        },
        {
            title: 'adresse',
            dataIndex: 'adress',
            key: 'adress',

        },
        {
            title: 'State of Command',
            dataIndex: 'state',
            key: 'state',

        },
        {
            title: 'Actions',
            dataIndex: 'state , id ',
            key: 'id',
            render: (_, record) => {
                const { state, id } = record;

                // Buttons to render based on the type
                let buttonsToShow = [];

                if (state === "en attente") {
                    buttonsToShow = [

                        <BsEye
                            key="view"
                            style={{ fontSize: "30px", color: "teal", cursor: "pointer" }}
                            onClick={() => {
                                FetchComandsDetails(id);
                                showModal();

                            }}
                        />
                    ];
                }

                else if (state === "refusé") {
                    buttonsToShow = [
                        <BsXCircle
                            key="reject"
                            style={{ fontSize: "30px", color: "red", cursor: "pointer" }}

                        />,
                        <BsEye
                            key="view"
                            style={{ fontSize: "30px", color: "teal", cursor: "pointer" }}
                            onClick={() => {
                                FetchComand(id);
                                FetchComandsDetails(id);
                                showModal();

                            }}
                        />
                    ];
                }
                else if (state === "accepté") {
                    buttonsToShow = [
                        <BsCheckSquare
                            key="approve"
                            style={{ fontSize: "30px", color: "green", cursor: "pointer" }}

                        />,
                        <BsEye
                            key="view"
                            style={{ fontSize: "30px", color: "teal", cursor: "pointer" }}
                            onClick={() => {
                                showModal();
                                FetchComandsDetails(id);
                            }}
                        />
                    ];
                }

                return <>{buttonsToShow}</>;
            },
        },


    ];

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setSingleP({});
    };

    return (
        <div>


            <div id="detail"></div>
            <h1 style={{ textAlign: 'center' }} > Commands List  </h1>

            {cammande.length ? (
                <Table dataSource={cammande} columns={columns} />
            ) : (
                <Skeleton />
            )}
            <Modal
                title="Detail Product"
                style={{ textAlign: 'center' }}
                open={isModalOpen}
                onCancel={handleCancel}
                footer={[
                    <Button key="close" onClick={handleCancel}>
                        Close
                    </Button>,
                ]}
            >


                < Space direction="vertical" style={{ width: '100%' }}>
                    <Text strong>Date of Order:</Text>
                    <Text>{moment(dateOrder).format('MMMM Do YYYY, h:mm a')}</Text>

                    <Divider />

                    <Text strong>Order Number:</Text>
                    <Text>{Comid}</Text>

                    <Divider />

                    <Text strong>Items:</Text>
                    <List
                        dataSource={CommandDetails}
                        renderItem={item => (
                            <List.Item>
                                <Space direction="vertical">
                                    <Text  >{item.nom} </Text>
                                    <Text>Quantity: </Text>
                                    <Text> Price: </Text>
                                </Space>
                                <Space direction="vertical">
                                    <Text>{item.prixunitaire}</Text>
                                    <Text>  {item.quantite} </Text>
                                    <Text> {item.prixunitaire}</Text>
                                </Space>
                            </List.Item>
                        )}
                    />
                    <Divider />
                    <Text strong className='d-flex justify-content-end' >`Total Price : ${montantTotal}` </Text>


                </Space>


            </Modal>

















        </div>
    )
}

export default MyComands