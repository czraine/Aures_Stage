import { Space } from "antd";
import "./App.css";
import AdminHeader from "./AdminHeader";
import SideMenu from "./SideMenu";
import PageContent from "./Content";
import Footer from "../Client_Pages/Footer";
import AdminFooter from "./AdminFooter";
import DashboardCrypto from "./dashboard";
import AppRoutes from "./AppRoutes";
import { useRoutes } from 'react-router-dom';
import { LocalizationProvider } from '@mui/x-date-pickers'; // Import LocalizationProvider and AdapterDateFns
import { CssBaseline } from '@mui/material';
import ThemeProvider from './../theme/ThemeProvider';


function AdminPanel() {
    const content = useRoutes(AppRoutes);

    return (
        <div className="App">
            <AdminHeader />
            <div className="SideMenuAndPageContent">
                <ThemeProvider>
                    <LocalizationProvider >
                        <CssBaseline />
                        {content}
                    </LocalizationProvider>
                </ThemeProvider>

            </div>
            <AdminFooter />
        </div>
    );
}
export default AdminPanel;