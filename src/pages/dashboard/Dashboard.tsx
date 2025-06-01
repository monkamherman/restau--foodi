import React from 'react';
import { Outlet } from 'react-router-dom';
import DashboardLayout from './components/DashboardLayout';
import { Box, Container, Typography, Grid, GridProps } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledDashboard = styled(Box)(({ theme }) => ({
  backgroundColor: 'bg-foodie-primary',
  minHeight: '100vh',
  padding: theme.spacing(3),
  overflowX: 'hidden',
}));

const Dashboard: React.FC = () => {
  return (
    <DashboardLayout>
      <StyledDashboard>
        <Container maxWidth="lg ">
          <Typography variant="h4" component="h1" gutterBottom>
            Tableau de bord
          </Typography>
          <Grid container spacing={3}>
            <Grid component="div" item xs={12} md={4}>
              <CardStats
                title="Commandes du jour"
                value="12"
                icon="receipt"
                color="primary"
              />
            </Grid>
            <Grid component="div" item xs={12} md={4}>
              <CardStats
                title="Chiffre d'affaires"
                value="€ 520"
                icon="euro"
                color="success"
              />
            </Grid>
            <Grid component="div" item xs={12} md={4}>
              <CardStats
                title="Clients satisfaits"
                value="98%"
                icon="thumb_up"
                color="info"
              />
            </Grid>
          </Grid>
          <Outlet />
        </Container>
      </StyledDashboard>
    </DashboardLayout>
  );
};

interface CardStatsProps {
  title: string;
  value: string;
  icon: string;
  color: 'primary' | 'success' | 'info' | 'warning' | 'error';
}

const CardStats: React.FC<CardStatsProps> = ({ title, value, icon, color }) => {
  return (
    <Box
      sx={{
        p: 3,
        borderRadius: 2,
        backgroundColor: 'bg-foodie-primary',
        color: 'white',
      }}
    >
      <Typography variant="h6" gutterBottom>
        {title}
      </Typography>
      <Typography variant="h4" component="div">
        {value}
      </Typography>
      <Box
        component="i"
        className={`material-icons ${icon}`}
        sx={{ fontSize: 40 }}
      />
    </Box>
  );
};

export default Dashboard;
