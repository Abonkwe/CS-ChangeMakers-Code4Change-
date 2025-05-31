import * as React from 'react';
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
  { text: 'Login', path: '/login', icon: <AccountCircleIcon /> },
];

export default function TechBridgeNavbar() {
  const [drawerOpen, setDrawerOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileOpportunitiesOpen, setMobileOpportunitiesOpen] = React.useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const toggleDrawer = (open) => (event) => {
    if (event?.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) return;
    setDrawerOpen(open);
  };

  const handleDropdownClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleDropdownClose = () => {
    setAnchorEl(null);
  };

  const handleMobileOpportunitiesClick = () => {
    setMobileOpportunitiesOpen((prev) => !prev);
  };

  const renderMenuItems = (isMobile = false) =>
    menuItems.map(({ text, path, icon, isDropdown }) => {
      const isActive = location.pathname === path;

      if (isDropdown && isMobile) {
        // Mobile: render a collapsible menu item
        return (
          <React.Fragment key={text}>
            <ListItem
              button
              onClick={handleMobileOpportunitiesClick}
              sx={{
                color: 'white',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                {icon}
                <ListItemText primary={text} />
              </Box>
              {mobileOpportunitiesOpen ? <KeyboardArrowDownIcon /> : <KeyboardArrowRightIcon />}
            </ListItem>
            <Collapse in={mobileOpportunitiesOpen} timeout="auto" unmountOnExit>
              <List component="div" disablePadding sx={{ pl: 4 }}>
                <ListItem
                  button
                  component={Link}
                  to="/internships"
                  sx={{ color: 'white' }}
                >
                  <ListItemText primary="Internships" />
                </ListItem>
                <ListItem
                  button
                  component={Link}
                  to="/jobs"
                  sx={{ color: 'white' }}
                >
                  <ListItemText primary="Jobs" />
                </ListItem>
              </List>
            </Collapse>
          </React.Fragment>
        );
      }

      if (isDropdown) return null; // desktop dropdown handled separately

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
            backgroundColor: isActive ? '#27ae60' : 'transparent',
            '&:hover': { backgroundColor: 'rgba(255, 255, 255, 0.1)' },
            px: 2,
            py: 1,
            textDecoration: 'none',
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
                        '&:hover': {
                          backgroundColor: 'white',
                          color: '#2ecc71',
                        },
                      }}
                    >
                      {text}
                    </Button>
                    <Menu
                      anchorEl={anchorEl}
                      open={Boolean(anchorEl)}
                      onClose={handleDropdownClose}
                      anchorOrigin={{
                        vertical: 'bottom',
                        horizontal: 'left',
                      }}
                      transformOrigin={{
                        vertical: 'top',
                        horizontal: 'left',
                      }}
                    >
                      <MenuItem onClick={() => { navigate('/internships'); handleDropdownClose(); }}>
                        Internships
                      </MenuItem>
                      <MenuItem onClick={() => { navigate('/jobs'); handleDropdownClose(); }}>
                        Jobs
                      </MenuItem>
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
                      backgroundColor: 'white',
                      color: '#2ecc71',
                    },
                  }}
                >
                  {text}
                </Button>
              );
            })}
          </Box>

          {/* Mobile Menu Icon */}
          <IconButton
            size="large"
            edge="end"
            aria-label="menu"
            sx={{ color: 'white', display: { xs: 'flex', md: 'none' } }}
            onClick={toggleDrawer(true)}
          >
            <MenuIcon />
          </IconButton>
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
          <List>{renderMenuItems(true)}</List>
        </Box>
      </Drawer>
    </Box>
  );
}
