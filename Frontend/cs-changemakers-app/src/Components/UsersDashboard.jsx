import React, { useState } from 'react';
import {
  Box,
  Typography,
  CssBaseline,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  AppBar,
  Toolbar,
  IconButton,
  Divider,
  Card,
  CardContent,
  Grid,
  Avatar,
  Chip,
  Paper,
  Button,
  Badge,
} from '@mui/material';
import { createTheme, ThemeProvider, styled } from '@mui/material/styles';
import { motion, AnimatePresence } from 'framer-motion';
import MenuIcon from '@mui/icons-material/Menu';
import DashboardIcon from '@mui/icons-material/Dashboard';
import SchoolIcon from '@mui/icons-material/School';
import WorkIcon from '@mui/icons-material/Work';
import AssignmentIcon from '@mui/icons-material/Assignment';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import PeopleIcon from '@mui/icons-material/People';
import NotificationsIcon from '@mui/icons-material/Notifications';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import GroupIcon from '@mui/icons-material/Group';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const drawerWidth = 280;

const theme = createTheme({
  palette: {
    mode: 'light',
    primary: { 
      main: '#2ecc71',
      light: '#58d68d',
      dark: '#27ae60',
    },
    secondary: {
      main: '#3498db',
      light: '#5dade2',
      dark: '#2980b9',
    },
    background: {
      default: 'linear-gradient(135deg, #f8fffe 0%, #f4f9f4 50%, #f0f8f0 100%)',
      paper: 'rgba(255, 255, 255, 0.95)',
    },
    success: {
      main: '#2ecc71',
    },
    text: {
      primary: '#2c3e50',
      secondary: '#7f8c8d',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h4: {
      fontWeight: 700,
    },
    h6: {
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        contained: {
          backgroundColor: '#2ecc71',
          color: 'white',
          fontWeight: 600,
          borderRadius: '12px',
          textTransform: 'none',
          boxShadow: '0 8px 20px rgba(46, 204, 113, 0.3)',
          '&:hover': {
            backgroundColor: '#27ae60',
            boxShadow: '0 12px 28px rgba(46, 204, 113, 0.4)',
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backdropFilter: 'blur(10px)',
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
        },
      },
    },
  },
});

const StyledDrawer = styled(Drawer)(({ theme }) => ({
  '& .MuiDrawer-paper': {
    boxSizing: 'border-box',
    width: drawerWidth,
    background: 'rgba(255, 255, 255, 0.95)',
    backdropFilter: 'blur(20px)',
    borderRight: '1px solid rgba(46, 204, 113, 0.1)',
  },
}));

const GradientBox = styled(Box)(({ theme }) => ({
  background: 'linear-gradient(135deg, #f8fffe 0%, #f4f9f4 50%, #f0f8f0 100%)',
  minHeight: '100vh',
}));

const GlassCard = styled(Card)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.9)',
  backdropFilter: 'blur(15px)',
  border: '1px solid rgba(255, 255, 255, 0.2)',
  borderRadius: '20px',
  transition: 'all 0.3s ease',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 20px 30px rgba(46, 204, 113, 0.15)',
  },
}));

const navigation = [
  { text: 'Dashboard', icon: DashboardIcon, path: '/dashboard' },
  { text: 'Mentorship', icon: SchoolIcon, path: '/mentorship' },
  { text: 'My Students', icon: PeopleIcon, path: '/students' },
  { text: 'Projects', icon: AssignmentIcon, path: '/projects' },
  { text: 'Job Opportunities', icon: WorkIcon, path: '/jobs' },
  { text: 'Earnings', icon: AccountBalanceWalletIcon, path: '/earnings' },
];

const MotionListItem = motion.create(ListItem);
const MotionCard = motion.create(Card);
const MotionBox = motion.create(Box);

export default function MentorDashboard() {
  const [activePath, setActivePath] = useState('/dashboard');
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const activeItem = navigation.find(item => item.path === activePath);

  const drawerContent = (
    <Box>
      {/* Sidebar Header */}
      <MotionBox
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        sx={{ p: 3, borderBottom: '1px solid rgba(46, 204, 113, 0.1)' }}
      >
        <Box display="flex" alignItems="center" gap={2}>
          <motion.div
            whileHover={{ rotate: 360 }}
            transition={{ duration: 0.8 }}
          >
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: '12px',
                background: '#2ecc71',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                boxShadow: '0 8px 20px rgba(46, 204, 113, 0.3)',
              }}
            >
              <SchoolIcon sx={{ color: 'white', fontSize: 24 }} />
            </Box>
          </motion.div>
          <Box>
            <Typography variant="h6" sx={{ fontWeight: 700, color: '#2c3e50' }}>
              MentorHub
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Mentor Platform
            </Typography>
          </Box>
        </Box>
      </MotionBox>

      {/* Navigation */}
      <List sx={{ p: 2 }}>
        {navigation.map((item, index) => {
          const Icon = item.icon;
          const isActive = activePath === item.path;
          
          return (
            <MotionListItem
              key={item.text}
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.98 }}
              button
              onClick={() => {
                setActivePath(item.path);
                setMobileOpen(false);
              }}
              sx={{
                mb: 1,
                borderRadius: '16px',
                background: isActive ? '#2ecc71' : 'transparent',
                color: isActive ? 'white' : 'inherit',
                boxShadow: isActive ? '0 8px 20px rgba(46, 204, 113, 0.3)' : 'none',
                '&:hover': {
                  background: isActive ? '#2ecc71' : 'rgba(46, 204, 113, 0.08)',
                },
              }}
            >
              <ListItemIcon>
                <Box
                  sx={{
                    p: 1,
                    borderRadius: '12px',
                    background: isActive ? 'rgba(255, 255, 255, 0.2)' : 'rgba(46, 204, 113, 0.1)',
                  }}
                >
                  <Icon sx={{ color: isActive ? 'white' : '#2ecc71', fontSize: 20 }} />
                </Box>
              </ListItemIcon>
              <ListItemText 
                primary={item.text} 
                primaryTypographyProps={{ fontWeight: 600 }}
              />
              {isActive && (
                <motion.div
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.3 }}
                >
                  <ChevronRightIcon sx={{ color: 'white', opacity: 0.8 }} />
                </motion.div>
              )}
            </MotionListItem>
          );
        })}
      </List>

      {/* Bottom Profile Section */}
      <MotionBox
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        sx={{ position: 'absolute', bottom: 24, left: 16, right: 16 }}
      >
        <Paper
          sx={{
            p: 2,
            borderRadius: '16px',
            background: 'rgba(46, 204, 113, 0.08)',
            border: '1px solid rgba(46, 204, 113, 0.2)',
          }}
        >
          <Box display="flex" alignItems="center" gap={2}>
            <Avatar
              sx={{
                width: 32,
                height: 32,
                background: '#2ecc71',
              }}
            >
              M
            </Avatar>
            <Box flex={1}>
              <Typography variant="body2" fontWeight={600}>
                John Mentor
              </Typography>
              <Box display="flex" alignItems="center" gap={1}>
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    bgcolor: '#2ecc71',
                  }}
                  component={motion.div}
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
                <Typography variant="caption" color="text.secondary">
                  Available
                </Typography>
              </Box>
            </Box>
          </Box>
        </Paper>
      </MotionBox>
    </Box>
  );

  const renderDashboardContent = () => (
    <>
      {/* Quick Stats */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {[
          { 
            label: 'Total Earnings', 
            value: '$2,845', 
            change: '+18%', 
            icon: AttachMoneyIcon, 
            color: '#2ecc71' 
          },
          { 
            label: 'Active Students', 
            value: '12', 
            change: '+3', 
            icon: GroupIcon, 
            color: '#3498db' 
          },
          { 
            label: 'Projects Posted', 
            value: '8', 
            change: '+2', 
            icon: AssignmentIcon, 
            color: '#e74c3c' 
          },
          { 
            label: 'Job Applications', 
            value: '5', 
            change: '+1', 
            icon: BusinessCenterIcon, 
            color: '#f39c12' 
          },
        ].map((stat, index) => (
          <Grid item xs={12} sm={6} lg={3} key={index}>
            <MotionCard
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 + 0.2 }}
              whileHover={{ y: -10 }}
              sx={{
                background: 'rgba(255, 255, 255, 0.9)',
                backdropFilter: 'blur(15px)',
                borderRadius: '20px',
                border: '1px solid rgba(255, 255, 255, 0.2)',
              }}
            >
              <CardContent sx={{ p: 3 }}>
                <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
                  <Box
                    sx={{
                      p: 1.5,
                      borderRadius: '12px',
                      background: stat.color,
                      boxShadow: `0 8px 20px ${stat.color}40`,
                    }}
                  >
                    <stat.icon sx={{ color: 'white', fontSize: 24 }} />
                  </Box>
                  <Chip
                    label={stat.change}
                    size="small"
                    sx={{
                      background: 'rgba(46, 204, 113, 0.1)',
                      color: '#2ecc71',
                      fontWeight: 600,
                    }}
                  />
                </Box>
                <Typography variant="h4" sx={{ mb: 1, fontWeight: 700, color: '#2c3e50' }}>
                  {stat.value}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {stat.label}
                </Typography>
              </CardContent>
            </MotionCard>
          </Grid>
        ))}
      </Grid>

      {/* Action Cards */}
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <GlassCard sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 700, color: '#2c3e50' }}>
              Quick Actions
            </Typography>
            <Box display="flex" flexDirection="column" gap={2}>
              <Button
                variant="contained"
                startIcon={<AssignmentIcon />}
                fullWidth
                sx={{ justifyContent: 'flex-start', p: 2 }}
              >
                Post New Project
              </Button>
              <Button
                variant="outlined"
                startIcon={<SchoolIcon />}
                fullWidth
                sx={{ 
                  justifyContent: 'flex-start', 
                  p: 2,
                  borderColor: '#2ecc71',
                  color: '#2ecc71',
                  '&:hover': {
                    backgroundColor: 'rgba(46, 204, 113, 0.08)',
                    borderColor: '#2ecc71',
                  }
                }}
              >
                Start Mentoring Session
              </Button>
              <Button
                variant="outlined"
                startIcon={<WorkIcon />}
                fullWidth
                sx={{ 
                  justifyContent: 'flex-start', 
                  p: 2,
                  borderColor: '#2ecc71',
                  color: '#2ecc71',
                  '&:hover': {
                    backgroundColor: 'rgba(46, 204, 113, 0.08)',
                    borderColor: '#2ecc71',
                  }
                }}
              >
                Browse Job Opportunities
              </Button>
            </Box>
          </GlassCard>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <GlassCard sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 700, color: '#2c3e50' }}>
              Recent Activity
            </Typography>
            <Box display="flex" flexDirection="column" gap={2}>
              {[
                { action: 'New student enrolled', time: '2 hours ago', type: 'student' },
                { action: 'Project milestone completed', time: '5 hours ago', type: 'project' },
                { action: 'Payment received: $150', time: '1 day ago', type: 'payment' },
                { action: 'Job application submitted', time: '2 days ago', type: 'job' },
              ].map((activity, index) => (
                <Box key={index} display="flex" alignItems="center" gap={2} p={1}>
                  <Box
                    sx={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      bgcolor: activity.type === 'payment' ? '#2ecc71' : '#3498db',
                    }}
                  />
                  <Box flex={1}>
                    <Typography variant="body2" fontWeight={600}>
                      {activity.action}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {activity.time}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </Box>
          </GlassCard>
        </Grid>
      </Grid>
    </>
  );

  const renderContent = () => {
    switch (activePath) {
      case '/dashboard':
        return renderDashboardContent();
      case '/mentorship':
        return (
          <GlassCard sx={{ p: 4 }}>
            <Typography variant="h5" sx={{ mb: 3, fontWeight: 700, color: '#2c3e50' }}>
              Mentorship Sessions
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              Manage your ongoing mentorship programs and connect with students seeking guidance.
            </Typography>
            <Button variant="contained" startIcon={<SchoolIcon />}>
              Start New Session
            </Button>
          </GlassCard>
        );
      case '/students':
        return (
          <GlassCard sx={{ p: 4 }}>
            <Typography variant="h5" sx={{ mb: 3, fontWeight: 700, color: '#2c3e50' }}>
              My Students
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              Track progress and communicate with your mentees.
            </Typography>
            <Button variant="contained" startIcon={<PeopleIcon />}>
              View All Students
            </Button>
          </GlassCard>
        );
      case '/projects':
        return (
          <GlassCard sx={{ p: 4 }}>
            <Typography variant="h5" sx={{ mb: 3, fontWeight: 700, color: '#2c3e50' }}>
              Project Management
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              Post new projects and manage existing ones to attract potential collaborators.
            </Typography>
            <Button variant="contained" startIcon={<AssignmentIcon />}>
              Post New Project
            </Button>
          </GlassCard>
        );
      case '/jobs':
        return (
          <GlassCard sx={{ p: 4 }}>
            <Typography variant="h5" sx={{ mb: 3, fontWeight: 700, color: '#2c3e50' }}>
              Job Opportunities
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              Explore freelance and employment opportunities from other skilled professionals.
            </Typography>
            <Button variant="contained" startIcon={<WorkIcon />}>
              Browse Jobs
            </Button>
          </GlassCard>
        );
      case '/earnings':
        return (
          <GlassCard sx={{ p: 4 }}>
            <Typography variant="h5" sx={{ mb: 3, fontWeight: 700, color: '#2c3e50' }}>
              Earnings Overview
            </Typography>
            <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
              Track your mentorship income and payment history.
            </Typography>
            <Button variant="contained" startIcon={<AccountBalanceWalletIcon />}>
              View Detailed Report
            </Button>
          </GlassCard>
        );
      default:
        return renderDashboardContent();
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <GradientBox>
        <Box sx={{ display: 'flex' }}>
          {/* AppBar */}
          <AppBar
            position="fixed"
            sx={{
              width: { sm: `calc(100% - ${drawerWidth}px)` },
              ml: { sm: `${drawerWidth}px` },
              background: 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(20px)',
              boxShadow: '0 8px 32px rgba(46, 204, 113, 0.1)',
              borderBottom: '1px solid rgba(46, 204, 113, 0.1)',
            }}
          >
            <Toolbar>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                sx={{ 
                  display: { sm: 'none' },
                  color: '#2c3e50',
                  mr: 2,
                }}
              >
                <MenuIcon />
              </IconButton>
              
              <Box display="flex" alignItems="center" gap={2} flex={1}>
                {activeItem && (
                  <motion.div
                    key={activeItem.path}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                  >
                    <Box display="flex" alignItems="center" gap={2}>
                      <Box
                        sx={{
                          p: 1.5,
                          borderRadius: '12px',
                          background: '#2ecc71',
                          boxShadow: '0 8px 20px rgba(46, 204, 113, 0.3)',
                        }}
                      >
                        <activeItem.icon sx={{ color: 'white', fontSize: 20 }} />
                      </Box>
                      <Box>
                        <Typography variant="h6" sx={{ color: '#2c3e50', fontWeight: 700 }}>
                          {activeItem.text}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                          Mentor Dashboard
                        </Typography>
                      </Box>
                    </Box>
                  </motion.div>
                )}
                
                <Box ml="auto" display="flex" alignItems="center" gap={2}>
                  <IconButton sx={{ color: '#2c3e50' }}>
                    <Badge badgeContent={3} color="primary">
                      <NotificationsIcon />
                    </Badge>
                  </IconButton>
                  <Chip
                    icon={
                      <Box
                        sx={{
                          width: 8,
                          height: 8,
                          borderRadius: '50%',
                          bgcolor: '#2ecc71',
                        }}
                        component={motion.div}
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                    }
                    label="Available for Mentoring"
                    size="small"
                    sx={{
                      display: { xs: 'none', sm: 'flex' },
                      background: 'rgba(46, 204, 113, 0.1)',
                      color: '#2ecc71',
                      border: '1px solid rgba(46, 204, 113, 0.2)',
                    }}
                  />
                </Box>
              </Box>
            </Toolbar>
          </AppBar>

          {/* Drawer */}
          <Box
            component="nav"
            sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
          >
            <StyledDrawer
              variant="temporary"
              open={mobileOpen}
              onClose={handleDrawerToggle}
              ModalProps={{ keepMounted: true }}
              sx={{
                display: { xs: 'block', sm: 'none' },
              }}
            >
              {drawerContent}
            </StyledDrawer>
            <StyledDrawer
              variant="permanent"
              sx={{
                display: { xs: 'none', sm: 'block' },
              }}
              open
            >
              {drawerContent}
            </StyledDrawer>
          </Box>

          {/* Main Content */}
          <Box
            component="main"
            sx={{
              flexGrow: 1,
              p: 3,
              width: { sm: `calc(100% - ${drawerWidth}px)` },
            }}
          >
            <Toolbar />
            
            <MotionBox
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {/* Welcome Card */}
              <GlassCard sx={{ mb: 3, p: 4 }}>
                <Box display="flex" alignItems="center" justifyContent="space-between">
                  <Box>
                    <Typography variant="h4" sx={{ mb: 1, color: '#2c3e50' }}>
                      Welcome back, John! 👋
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ fontSize: '1.1rem' }}>
                      Ready to inspire and guide the next generation of learners? You have{' '}
                      <Typography component="span" sx={{ fontWeight: 600, color: '#2ecc71' }}>
                        3 new mentorship requests
                      </Typography>{' '}
                      waiting for your response.
                    </Typography>
                  </Box>
                  
                  <motion.div
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    whileHover={{ rotate: 360 }}
                  >
                    <Box
                      sx={{
                        p: 3,
                        borderRadius: '20px',
                        background: '#2ecc71',
                        boxShadow: '0 15px 30px rgba(46, 204, 113, 0.3)',
                        display: { xs: 'none', sm: 'flex' },
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      <SchoolIcon sx={{ fontSize: 48, color: 'white' }} />
                    </Box>
                  </motion.div>
                </Box>
              </GlassCard>

              {/* Dynamic Content */}
              {renderContent()}
            </MotionBox>
          </Box>
        </Box>
      </GradientBox>
    </ThemeProvider>
  );
}