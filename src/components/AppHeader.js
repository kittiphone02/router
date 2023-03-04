// import { NavLink } from 'react-router-dom';
// import './AppHeader.css';

// function AppHeader() {
//   function getNavClass(navLinkProps) {
//     let navClass = 'app-header-item';
//     if (navLinkProps.isActive) navClass += ' app-header-item-active';
//     return navClass;
//   }

//   return (
//     <header className="app-header">
//       <NavLink className={getNavClass} to="/" end>Homepage</NavLink>
//       <NavLink className={getNavClass} to="about">About</NavLink>
//     </header>
//   );
// }

// export default AppHeader;
import { useState } from 'react';
import { NavLink } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, List, ListItem, ListItemText, Drawer, InputBase, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import './AppHeader.css';

function AppHeader() {
  const [drawerOpen, setDrawerOpen] = useState(false);

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <AppBar position="static" className="app-header">
      <Toolbar>
        <IconButton color="inherit" aria-label="menu" onClick={toggleDrawer}>
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" sx={{ flexGrow: 1 }} noWrap>
          <NavLink to="/" className="logo">
            Your Logo Here
          </NavLink>
        </Typography>
        <div className="search">
          <div className="searchIcon">
            <SearchIcon />
          </div>
          <InputBase
            placeholder="Search…"
            inputProps={{ 'aria-label': 'search' }}
          />
        </div>
        <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer}>
          <List>
            <ListItem button component={NavLink} to="/" exact onClick={toggleDrawer}>
              <ListItemText primary="Homepage" />
            </ListItem>
            <ListItem button component={NavLink} to="/about" onClick={toggleDrawer}>
              <ListItemText primary="About" />
            </ListItem>
          </List>
        </Drawer>
      </Toolbar>
    </AppBar>
  );
}

export default AppHeader;

