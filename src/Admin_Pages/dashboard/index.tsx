import { Helmet } from 'react-helmet-async';
import PageHeader from './PageHeader';
import { Card, Container } from '@mui/material';
import ChiffreAffaires from './dashboards/Stats/ChiffreAffaires';
import TopClient from './dashboards/Stats/TopClient';
import BarChart from './dashboards/Stats/BarChart';


function DashboardCrypto() {
  return (
    <>

      <PageHeader />
      <Container maxWidth="lg">
        <Card style={{ backgroundColor: '#e9e9e9' }}>
          <ChiffreAffaires />
          <TopClient />
          <BarChart />
        </Card>
      </Container>
    </>
  );
}

export default DashboardCrypto;
