import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MoreIcon from '@mui/icons-material/MoreVert';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { Link, useNavigate } from 'react-router-dom';

const userMenuItems = [
  { label: 'UserListDb', path: '/birinci' },
  { label: 'Ikinci', path: '/ikinci' },
  { label: 'Üçüncü', path: '/ucuncu' },
];

const Navbar = ({ isLoggedIn, username, onLogout, onShowGoogle }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const [menuAnchorEl, setMenuAnchorEl] = useState(null);
  const [yasalAnchorEl, setYasalAnchorEl] = useState(null);
  const navigate = useNavigate();

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const isDrawerMenuOpen = Boolean(menuAnchorEl);
  const isYasalMenuOpen = Boolean(yasalAnchorEl);

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const handleLogout = () => {
    onLogout();
    handleMenuClose();
    navigate('/login');
  };

  // Sol menü (MenuIcon) için
  const handleDrawerMenuOpen = (event) => {
    setMenuAnchorEl(event.currentTarget);
  };
  const handleDrawerMenuClose = () => {
    setMenuAnchorEl(null);
    setYasalAnchorEl(null);
  };
  const handleDrawerMenuItemClick = (path) => {
    handleDrawerMenuClose();
    navigate(path);
  };
  // Yasal Uyarılar alt menüsü
  const handleYasalMenuOpen = (event) => {
    setYasalAnchorEl(event.currentTarget);
  };
  const handleYasalMenuClose = () => {
    setYasalAnchorEl(null);
  };

  // Google menü item'ı için
  const handleGoogleClick = () => {
    handleDrawerMenuClose();
    if (onShowGoogle) onShowGoogle();
  };

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'left' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {isLoggedIn ? (
        <>
          <MenuItem disabled>{username}</MenuItem>
          {userMenuItems.map((item) => (
            <MenuItem key={item.path} onClick={() => handleDrawerMenuItemClick(item.path)}>
              {item.label}
            </MenuItem>
          ))}
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </>
      ) : (
        <MenuItem onClick={() => { handleMenuClose(); navigate('/login'); }}>Login</MenuItem>
      )}
    </Menu>
  );

  // Sol menü (MenuIcon) için
  const renderDrawerMenu = (
    <Menu
      anchorEl={menuAnchorEl}
      open={isDrawerMenuOpen}
      onClose={handleDrawerMenuClose}
      anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
      transformOrigin={{ vertical: 'top', horizontal: 'left' }}
    >
      {isLoggedIn && userMenuItems.map((item) => (
        <MenuItem key={item.path} onClick={() => handleDrawerMenuItemClick(item.path)}>
          {item.label}
        </MenuItem>
      ))}
      <MenuItem
        onClick={handleYasalMenuOpen}
        aria-haspopup="true"
        aria-controls="yasal-uyarilar-menu"
        sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
      >
        Yasal Uyarılar <ArrowRightIcon fontSize="small" />
      </MenuItem>
      <Menu
        id="yasal-uyarilar-menu"
        anchorEl={yasalAnchorEl}
        open={isYasalMenuOpen}
        onClose={handleYasalMenuClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'left' }}
      >
        <MenuItem onClick={handleGoogleClick}>Google</MenuItem>
        <MenuItem onClick={() => { handleDrawerMenuItemClick('/yasal-uyarilar'); }}>Yasal Uyarılar</MenuItem>
      </Menu>
    </Menu>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open drawer"
            sx={{ mr: 2 }}
            onClick={handleDrawerMenuOpen}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            noWrap
            component={Link}
            to="/"
            sx={{ color: 'inherit', textDecoration: 'none', display: { xs: 'none', sm: 'block' } }}
          >
            Home
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          {username}
          <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
            <IconButton
              size="large"
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </Box>
          <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="show more"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MoreIcon />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      {renderDrawerMenu}
      {renderMenu}
    </Box>
  );
};

export default Navbar; 