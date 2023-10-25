import { BellFilled, MailOutlined } from "@ant-design/icons";
import { Badge, Drawer, Image, List, Space, Typography } from "antd";
import { useEffect, useState } from "react";
import { Button } from "react-bootstrap"

function AdminHeader() {
    const [comments, setComments] = useState([]);
    const [orders, setOrders] = useState([]);
    const [commentsOpen, setCommentsOpen] = useState(false);
    const [notificationsOpen, setNotificationsOpen] = useState(false);

    useEffect(() => {

        fetch(`http://localhost:5000/todos`).then(res => res.json()).then((json) => {
            setOrders(json);
        });
    }, []);

    return (
        <div className="AppHeader">
            <Image

                src="https://datasym.co.uk/wp-content/uploads/2017/09/aures-Logo.png" alt=" Baa3333333 " height={40} width={200}>
            </Image>
            <Typography.Title>Admin Dashboard</Typography.Title>
            <Space>
                <Badge count={comments.length} dot>
                    <MailOutlined
                        style={{ fontSize: 24 }}
                        onClick={() => {
                            setCommentsOpen(true);
                        }}
                    />
                </Badge>
                <Badge count={orders.length}>
                    <BellFilled
                        style={{ fontSize: 24 }}
                        onClick={() => {
                            setNotificationsOpen(true);
                        }}
                    />
                </Badge>

                <Button variant="outline-light" onClick={() => {
                    window.location.href = "/";
                    localStorage.removeItem('userData');
                }}> logout  </Button>

            </Space>
            <Drawer
                title="Comments"
                open={commentsOpen}
                onClose={() => {
                    setCommentsOpen(false);
                }}
                maskClosable
            >
                <List
                    dataSource={comments}
                    renderItem={(item) => {
                        return <List.Item>{item.body}</List.Item>;
                    }}
                ></List>
            </Drawer>
            <Drawer
                title="Notifications"
                open={notificationsOpen}
                onClose={() => {
                    setNotificationsOpen(false);
                }}
                maskClosable
            >
                <List
                    dataSource={orders}
                    renderItem={(item) => {
                        return (
                            <List.Item>
                                <Typography.Text strong>{item.title}</Typography.Text> has been
                                ordered!
                            </List.Item>
                        );
                    }}
                ></List>
            </Drawer>
        </div>
    );
}
export default AdminHeader
