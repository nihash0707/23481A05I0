import React from 'react';
import { AppBar, Toolbar, Typography, Button, Container, Box } from '@mui/material';
import { Link as RouterLink, useLocation } from 'react-router-dom';
import NotificationsIcon from '@mui/icons-material/Notifications';

const Layout = ({ children }) => {
  const location = useLocation();

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh', backgroundColor: '#f5f5f5' }}>
      <AppBar position="static" color="primary" elevation={0}>
        <Container maxWidth="lg">
          <Toolbar disableGutters>
            <NotificationsIcon sx={{ mr: 2 }} />
            <Typography variant="h6" component="div" sx={{ flexGrow: 1, fontWeight: 'bold' }}>
              Campus Notify
            </Typography>
            <Box sx={{ display: 'flex', gap: 2 }}>
              <Button 
                component={RouterLink} 
                to="/" 
                color="inherit"
                sx={{ 
                  fontWeight: location.pathname === '/' ? 'bold' : 'normal',
                  borderBottom: location.pathname === '/' ? '2px solid white' : 'none',
                  borderRadius: 0
                }}
              >
                All Notifications
              </Button>
              <Button 
                component={RouterLink} 
                to="/priority" 
                color="inherit"
                sx={{ 
                  fontWeight: location.pathname === '/priority' ? 'bold' : 'normal',
                  borderBottom: location.pathname === '/priority' ? '2px solid white' : 'none',
                  borderRadius: 0
                }}
              >
                Priority Inbox
              </Button>
            </Box>
          </Toolbar>
        </Container>
      </AppBar>
      <Container maxWidth="md" sx={{ flexGrow: 1, py: 4 }}>
        {children}
      </Container>
    </Box>
  );
};

export default Layout;
