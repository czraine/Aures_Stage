import React, { useEffect, useState } from 'react';
import {
    Input,
    Divider,
    Image,
    Menu,
    message,
    Modal,
    Skeleton,
    Spin,
    Table,

    Typography,
    Form,
    Space,
} from "antd";
import { Button } from "react-bootstrap"

import './../App.css';
import { SearchOutlined } from '@ant-design/icons';
import type { ColumnType, ColumnsType, TableProps } from 'antd/es/table';

import axios from "axios";
import { BsTrash, BsEye, BsPencilSquare } from "react-icons/bs";
interface Categoris {
    id: any;
    title: any;
    image: any;
    userid: any;

}
interface DataType {
    key: string;
    name: string;
    price_tag: number;
}
function Categ() {
    const [IsUpdate, setIsupdate] = useState(false);
    const [Isadded, setIsadded] = useState(false);

    const [CategoryModal, setCategoryModal] = useState(false);
    const [OpenModal, setOpenModal] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [EditingModal, setEditingModal] = useState(false);
    const [categori, setCategori] = useState<Categoris[]>([]);
    const [singleP, setSingleP] = useState<any>({});
    const [Cid, setCid] = useState(0);
    const [title, setTitle] = useState("");
    const [image, setImage] = useState('');
    const [usaid, setUsaid] = useState(0);
    const [username, setUsername] = useState("");
    const [userid, setUserid] = useState(0);
    const storedUserData = localStorage.getItem('userData');
    useEffect(() => {
        const userData = JSON.parse(storedUserData);
        setUsername(userData.uname);
        setUsaid(userData.myid);
    }, [storedUserData]);

    useEffect(() => {
        fetch(`http://localhost:5000/Category/userid/${usaid}`)
            .then(res => res.json())
            .then((json) => setCategori(json));
    }, [usaid, IsUpdate, Isadded]);

    useEffect(() => {
        setTitle(singleP?.title || "");
        setImage(singleP?.image || "");
        setUserid(singleP?.userid || "");
    }, [singleP]);
    const { Title } = Typography;
    const onSubmitForm = async e => {
        //  e.preventDefault(); // Prevent default form submission

        const userData = JSON.parse(storedUserData);
        setUsaid(userData.myid);

        try {
            const body = { title, image, userid: usaid }; // Make sure 'usaid' is an integer
            const response = await fetch("http://localhost:5000/Category", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            });
            setIsadded(!Isadded);
            handleCloseCatg();
            // Handle response here
        } catch (err) {
            console.error(err.message);
        }
    };
    const DeleteHandler = async (id) => {
        try {
            await fetch(`http://localhost:5000/Category/${id}`, {
                method: "DELETE"
            });
            setCategori(categori.filter((p) => p.id !== id));
            message.success("Category Deleted");
        } catch (err) {
            console.error(err.message);
        }
    };
    const FetchSingleCategory = (id) => {
        axios.get(`http://localhost:5000/Category/${id}`).then((res) => {
            setSingleP(res.data);

        });
    };
    const handletest = () => {
        message.success(title);

    };
    const onEditCategory = async (e) => {
        const instnum: number = usaid;
        try {
            const body = { Cid, title, image, userid: instnum };
            const response = await fetch(`http://localhost:5000/Category/${Cid}`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(body)
            }
            );
            message.success("between" + userid + "  and " + instnum);
            console.log("yay it been added ");
            setIsupdate(!IsUpdate);
            handleEditClose();
        } catch (err) {
            console.log("nope something wrong happend");
            console.error(err.message);
        }

    };

    const showModal = () => {
        setIsModalOpen(true);
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setSingleP({});
    };
    const handleOpen = () => {
        setOpenModal(true);
    };
    const handleCategory = () => {
        setCategoryModal(true);
    };
    const handleCloseCatg = () => {
        setCategoryModal(false);
        setSingleP({});
    };
    const handleClose = () => {
        setOpenModal(false);
        setSingleP({});
    };
    const handleOpenEdit = () => {
        setEditingModal(true);
    };

    const handleEditClose = () => {
        setEditingModal(false);
        setSingleP({});
    };

    const columns = [
        {
            title: 'Admin',
            dataIndex: 'userid',
            key: 'userid',

        },

        {
            title: 'Title',
            dataIndex: 'name',
            key: 'name',
        },

        {
            title: 'Image',
            dataIndex: 'image',
            key: 'image',
            render: (_, record) => {
                return <Image width={300} src={record?.image} />;

            }
        },

        {
            title: 'Actions',
            dataIndex: 'id',
            key: 'id',
            render: (_, { id }) => {
                return (
                    <>
                        <BsTrash
                            style={{ fontSize: "30px", color: "red", cursor: "pointer" }}
                            onClick={() => DeleteHandler(id)}

                        />
                        <BsEye
                            style={{ fontSize: "30px", color: "teal", cursor: "pointer" }}
                            onClick={() => {
                                showModal();
                                FetchSingleCategory(id);
                            }
                            }

                        />
                        <BsPencilSquare style={{ fontSize: "30px", color: "black", cursor: "pointer" }}
                            onClick={() => {
                                setCid(id);
                                handleOpenEdit();
                                FetchSingleCategory(id);
                            }
                            } />
                    </>
                );
            },
        },
    ];
    const tableProps: TableProps<DataType> = {
        bordered: true,
        size: "large",
        showHeader: true,

        tableLayout: "fixed",
    };
    return (
        <Space size="large" direction="vertical">
            <div className="d-flex justify-content-end">

                <Button variant="outline-dark" size="lg" style={{ marginRight: 20 }} onClick={() => {
                    handleCategory();
                }} > Add Category   </Button>
            </div>

            {categori.length ? (
                <Table {...tableProps} dataSource={categori} columns={columns} pagination={{
                    pageSize: 5,
                }} />
            ) : (
                <Skeleton />
            )}
            <Modal
                title="Detail Category"
                open={isModalOpen}
                onCancel={handleCancel}
                footer={null}
            >
                {singleP?.id ? (
                    <>
                        <p>
                            <div style={{ display: "flex" }}>
                                <img src={singleP?.image} width="200px" />

                            </div>
                        </p>
                        <Divider />
                        <p>
                            <Title level={2}>{singleP?.title}</Title>
                        </p>

                    </>
                ) : (
                    <Spin size="large" />
                )}
            </Modal>
            <Modal
                title="Add Category"
                open={CategoryModal}
                onCancel={handleCloseCatg}
                footer={null}
            >
                {<Form
                    labelCol={{ span: 4 }}
                    wrapperCol={{ span: 14 }}
                    layout="horizontal"
                    style={{
                        alignItems: 'center',
                        marginTop: 32
                    }}
                    onFinish={onSubmitForm}
                >
                    <Form.Item label="Title" required	 >
                        <Input size='large' placeholder='Product Name ' value={title}
                            onChange={e => setTitle(e.target.value)} />
                    </Form.Item>
                    <Form.Item label="Upload Image " required 	>
                        <Input size='large' placeholder='Image Link ' value={image}
                            onChange={e => setImage(e.target.value)} />
                    </Form.Item>
                    <Form.Item >
                        <Button variant="primary" type="submit" style={{ width: '100%' }}  >
                            Add Category
                        </Button>
                    </Form.Item>

                </Form >}
            </Modal>
            <Modal
                title="Edit Category"
                open={EditingModal}
                onCancel={handleEditClose}
                footer={null}

            >
                {singleP?.id ? (
                    <>
                        <Form
                            labelCol={{ span: 4 }}
                            wrapperCol={{ span: 14 }}
                            layout="horizontal"
                            style={{
                                alignItems: 'center',
                                marginTop: 32
                            }}
                            onFinish={onEditCategory}
                            initialValues={{  // Set initial values for form fields
                                title: singleP?.title,
                                image: singleP?.image || "",
                            }}

                        >
                            <Form.Item label="Title" required	 >
                                <Input size='large' placeholder='Category Name' value={title}
                                    onChange={e => setTitle(e.target.value)} />
                            </Form.Item>


                            <Form.Item label="Upload Image " required 	>
                                <Input size='large' placeholder='Image Link ' value={image}
                                    onChange={e => setImage(e.target.value)} />
                            </Form.Item>


                            <Form.Item >
                                <Button variant="primary" type="submit" style={{ width: '100%' }}  >
                                    Edit Category
                                </Button>
                            </Form.Item>

                        </Form >
                    </>
                ) : (
                    <Spin size="large" />
                )}
            </Modal>

        </Space>
    );
}

export default Categ;