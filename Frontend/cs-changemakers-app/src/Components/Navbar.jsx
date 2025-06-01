import React, { useEffect, useState } from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemText,
  Menu,
  MenuItem,
  Collapse,
  Avatar,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import CodeIcon from '@mui/icons-material/Code';
import SchoolIcon from '@mui/icons-material/School';
import WorkIcon from '@mui/icons-material/Work';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import { useLocation, Link, useNavigate } from 'react-router-dom';

const menuItems = [
  { text: 'Home', path: '/', icon: <CodeIcon /> },
  { text: 'About Us', path: '/about', icon: <SchoolIcon /> },
  { text: 'Mentors', path: '/mentors', icon: <AccountCircleIcon /> },
  { text: 'Opportunities', isDropdown: true, icon: <WorkIcon /> },
  { text: 'Services', path: '/services', icon: <CodeIcon /> },
];

const opportunityItems = [
  { text: 'Internships', path: '/internships' },
  { text: 'Jobs', path: '/jobs' },
  { text: 'Projects', path: '/projects' },
];

export default function TechBridgeNavbar() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileOpportunitiesOpen, setMobileOpportunitiesOpen] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userName, setUserName] = useState('');
  const [userRole, setUserRole] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    const name = localStorage.getItem("user_name");
    const role = localStorage.getItem("user_role");
    setUserName(name || "");
    setUserRole(role || "");
    setIsAuthenticated(!!token);
  }, []);

  const toggleDrawer = (open) => (event) => {
    if (event?.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) return;
    setDrawerOpen(open);
  };

  const handleDropdownClick = (event) => setAnchorEl(event.currentTarget);
  const handleDropdownClose = () => setAnchorEl(null);
  const handleMobileOpportunitiesClick = () => setMobileOpportunitiesOpen(prev => !prev);

  const handleLogout = () => {
    localStorage.clear();
    setIsAuthenticated(false);
    setUserName("");
    setUserRole("");
    navigate("/signup");
    window.location.reload();
  };

  const handleUserAvatarClick = () => {
    if (userRole === "mentor") navigate("/usersdashboard");
    else if (userRole === "learner") navigate("/learnerdashboard");
  };

  const renderMobileMenuItems = () =>
    menuItems.map(({ text, path, icon, isDropdown }) => {
      if (isDropdown) {
        return (
          <React.Fragment key={text}>
            <ListItem
              button
              onClick={handleMobileOpportunitiesClick}
              sx={{ color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                {icon}
                <ListItemText primary={text} />
              </Box>
              {mobileOpportunitiesOpen ? <KeyboardArrowDownIcon /> : <KeyboardArrowRightIcon />}
            </ListItem>
            <Collapse in={mobileOpportunitiesOpen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding sx={{ pl: 4 }}>
                {opportunityItems.map(({ text: itemText, path: itemPath }) => (
                  <ListItem key={itemText} button component={Link} to={itemPath} sx={{ color: 'white' }}>
                    <ListItemText primary={itemText} />
                  </ListItem>
                ))}
              </List>
            </Collapse>
          </React.Fragment>
        );
      }

      const isActive = location.pathname === path;
      return (
        <ListItem
          button
          key={text}
          component={Link}
          to={path}
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            color: isActive ? 'white' : '#ffffffb3',
            backgroundColor: isActive ? 'rgba(255, 255, 255, 0.2)' : 'transparent',
            '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' },
            px: 2,
            py: 1,
          }}
        >
          {icon}
          <ListItemText primary={text} />
        </ListItem>
      );
    });

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: '#2ecc71', px: { xs: 2, md: 6 } }}>
        <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
          {/* Logo */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <CodeIcon fontSize="large" sx={{ color: 'white' }} />
            <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', color: 'white' }}>
              TechBridge
            </Typography>
          </Box>

          {/* Desktop Menu */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 3 }}>
            {menuItems.map(({ text, path, isDropdown }) => {
              if (isDropdown) {
                return (
                  <Box key={text}>
                    <Button
                      onClick={handleDropdownClick}
                      endIcon={
                        <KeyboardArrowDownIcon
                          sx={{
                            transform: Boolean(anchorEl) ? 'rotate(180deg)' : 'rotate(0deg)',
                            transition: 'transform 0.2s ease-in-out',
                          }}
                        />
                      }
                      sx={{
                        fontWeight: '600',
                        color: 'white',
                        textTransform: 'none',
                        borderRadius: '20px',
                        px: 2,
                        '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' },
                      }}
                    >
                      {text}
                    </Button>
                    <Menu
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl)}
                      onClose={handleDropdownClose}
                      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                      transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                    >
                      {opportunityItems.map(({ text: itemText, path: itemPath }) => (
                        <MenuItem 
                          key={itemText}
                          onClick={() => { navigate(itemPath); handleDropdownClose(); }}
                        >
                          {itemText}
                        </MenuItem>
                      ))}
                    </Menu>
                  </Box>
                );
              }

              const isActive = location.pathname === path;
              return (
                <Button
                  key={text}
                  component={Link}
                  to={path}
                  sx={{
                    fontWeight: '600',
                    color: isActive ? '#2ecc71' : 'white',
                    backgroundColor: isActive ? 'white' : 'transparent',
                    borderRadius: '20px',
                    px: 2,
                    textTransform: 'none',
                    '&:hover': {
                      backgroundColor: isActive ? 'white' : 'rgba(255, 255, 255, 0.1)',
                      color: isActive ? '#2ecc71' : 'white',
                    },
                  }}
                >
                  {text}
                </Button>
              );
            })}
          </Box>

          {/* User Section */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            {isAuthenticated ? (
              <>
                <Avatar
                  sx={{
                    bgcolor: "white",
                    color: "#2ecc71",
                    width: 40,
                    height: 40,
                    fontWeight: 700,
                    fontSize: 16,
                    cursor: userRole ? "pointer" : "default",
                    '&:hover': userRole ? { bgcolor: '#f0f0f0' } : {},
                  }}
                  onClick={handleUserAvatarClick}
                >
                  {userName ? userName.slice(0, 2).toUpperCase() : "U"}
                </Avatar>
                <Button
                  onClick={handleLogout}
                  sx={{
                    fontWeight: '600',
                    color: 'white',
                    textTransform: 'none',
                    borderRadius: '20px',
                    px: 2,
                    border: '1px solid white',
                    '&:hover': {
                      backgroundColor: 'white',
                      color: '#2ecc71',
                    },
                  }}
                >
                  Logout
                </Button>
              </>
            ) : (
              <Button
                component={Link}
                to="/signup"
                sx={{
                  fontWeight: '600',
                  color: 'white',
                  textTransform: 'none',
                  borderRadius: '20px',
                  px: 3,
                  border: '1px solid white',
                  '&:hover': {
                    backgroundColor: 'white',
                    color: '#2ecc71',
                  },
                }}
              >
                Sign Up
              </Button>
            )}

            {/* Mobile Menu Icon */}
            <IconButton
              size="large"
              edge="end"
              aria-label="menu"
              sx={{ color: 'white', display: { xs: 'flex', md: 'none' }, ml: 1 }}
              onClick={toggleDrawer(true)}
            >
              <MenuIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer anchor="right" open={drawerOpen} onClose={toggleDrawer(false)}>
        <Box
          sx={{ width: 250, pt: 2, backgroundColor: '#2ecc71', height: '100%' }}
          role="presentation"
          onClick={toggleDrawer(false)}
          onKeyDown={toggleDrawer(false)}
        >
          <List>{renderMobileMenuItems()}</List>
          {/* Mobile Auth Section */}
          <Box sx={{ p: 2, borderTop: '1px solid rgba(255,255,255,0.2)', mt: 'auto' }}>
            {!isAuthenticated && (
              <Button
                component={Link}
                to="/signup"
                fullWidth
                sx={{
                  color: 'white',
                  border: '1px solid white',
                  borderRadius: '20px',
                  textTransform: 'none',
                  fontWeight: 600,
                  '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)' },
                }}
              >
                Sign Up
              </Button>
            )}
          </Box>
        </Box>
      </Drawer>
    </Box>
  );
}