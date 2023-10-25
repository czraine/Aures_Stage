import {
    DollarCircleOutlined,
    ShoppingCartOutlined,
    ShoppingOutlined,
    UserOutlined,
} from "@ant-design/icons";

import { Bar } from "react-chartjs-2";

import { Card, Space, Statistic, Table, Typography } from "antd";
import { useEffect, useState } from "react";

import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
    ChartOptions,
} from "chart.js";
import Commande from "../Commande";

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

interface comands {
    id: any;
    userid: any;
    dateOrder: any;
    montantotal: any;
    adresse: any;
    idclient: any;
}
interface comandsDetails {
    id: any;
    idCommand: any;
    nom: any;
    prixunitaire: any;
    quantite: any;

}
function AdminPage() {
    const [orders, setOrders] = useState(0);
    const [inventory, setInventory] = useState(0);
    const [customers, setCustomers] = useState(0);
    const [revenue, setRevenue] = useState(0);
    const [commande, setCommande] = useState<comands[]>([]);
    const [customer, setCustomer] = useState<any[]>([]);
    const [prod, setprod] = useState<any[]>([]);

    const [DetailsCommand, setDetailsCommand] = useState<comandsDetails[]>([]);


    useEffect(() => {
        fetch(`http://localhost:5000/Command/`).then(res => res.json()).then((json) => {
            setCommande(json);
        });
        fetch(`http://localhost:5000/commandetails`).then(res => res.json()).then((json) => {
            setDetailsCommand(json);
        });
        fetch(`http://localhost:5000/User`).then(res => res.json()).then((json) => {
            setCustomer(json);
        });
        fetch(`http://localhost:5000/todos`).then(res => res.json()).then((json) => {
            setprod(json);
        });
    }, []);
    useEffect(() => {
        commande.map((res) => {
            setOrders(orders + res.montantotal);
        });
        setRevenue(prod.length);
        setInventory(DetailsCommand.length);
        setCustomers(customer.length);

    }, []);

    return (
        <Space size={20} direction="vertical">
            <Typography.Title level={4}>Dashboard</Typography.Title>
            <Space direction="horizontal">
                <DashboardCard
                    icon={
                        <ShoppingCartOutlined
                            style={{
                                color: "green",
                                backgroundColor: "rgba(0,255,0,0.25)",
                                borderRadius: 20,
                                fontSize: 24,
                                padding: 8,
                            }}
                        />
                    }
                    title={"Orders"}
                    value={orders}
                />
                <DashboardCard
                    icon={
                        <ShoppingOutlined
                            style={{
                                color: "blue",
                                backgroundColor: "rgba(0,0,255,0.25)",
                                borderRadius: 20,
                                fontSize: 24,
                                padding: 8,
                            }}
                        />
                    }
                    title={"Inventory"}
                    value={inventory}
                />
                <DashboardCard
                    icon={
                        <UserOutlined
                            style={{
                                color: "purple",
                                backgroundColor: "rgba(0,255,255,0.25)",
                                borderRadius: 20,
                                fontSize: 24,
                                padding: 8,
                            }}
                        />
                    }
                    title={"Customer"}
                    value={customers}
                />
                <DashboardCard
                    icon={
                        <DollarCircleOutlined
                            style={{
                                color: "red",
                                backgroundColor: "rgba(255,0,0,0.25)",
                                borderRadius: 20,
                                fontSize: 24,
                                padding: 8,
                            }}
                        />
                    }
                    title={"Products"}
                    value={revenue}
                />
            </Space>
            <Space>
                <RecentOrders />
                <DashboardChart />
            </Space>
        </Space>
    );
}
function DashboardCard({ title, value, icon }) {
    return (
        <Card>
            <Space direction="horizontal">
                {icon}
                <Statistic title={title} value={value} />
            </Space>
        </Card>
    );
}
function RecentOrders() {
    const [dataSource, setDataSource] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        fetch("http://localhost:5000/commandetails").then(res => res.json()).then((json) => {
            setDataSource(json.splice(0, 3));
            setLoading(false);
        });
    }, []);

    return (
        <>
            <Typography.Text>Recent Orders</Typography.Text>
            <Table
                columns={[
                    {
                        title: "Title",
                        dataIndex: "nom",
                    },
                    {
                        title: "Quantity",
                        dataIndex: "quantite",
                    },
                    {
                        title: "Price",
                        dataIndex: "prixunitaire",
                    },
                ]}
                loading={loading}
                dataSource={dataSource}
                pagination={false}
            ></Table>
        </>
    );
}
function DashboardChart() {
    const [reveneuData, setReveneuData] = useState({
        labels: [],
        datasets: [],
    });

    useEffect(() => {
        fetch(`http://localhost:5000/Command/`).then(res => res.json()).then((json) => {
            const labels = json.map((cart) => {
                return `User-${cart.clientid}`;
            });
            const data = json.map((cart) => {
                return cart.montantotal;
            });

            const dataSource = {
                labels,
                datasets: [
                    {
                        label: "Revenue",
                        data: data,
                        backgroundColor: "rgba(255, 0, 0, 1)",
                    },
                ],
            };

            setReveneuData(dataSource);
        });
    }, []);

    const options: ChartOptions<'bar'> = {
        responsive: true,
        plugins: {
            legend: {
                position: "bottom",
            },
            title: {
                display: true,
                text: "Order Revenue",
            },
        },
    };


    return (
        <Card style={{ width: 500, height: 250 }}>
            <Bar options={options} data={reveneuData} />
        </Card>
    );
}

export default AdminPage
