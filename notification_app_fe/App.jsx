import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { NotificationProvider } from './NotificationContext';
import Layout from './Layout';
import AllNotifications from './AllNotifications';
import PriorityNotifications from './PriorityNotifications';

// Create a premium looking theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#1a365d', // Deep blue
    },
    secondary: {
      main: '#00a3c4', // Cyan
    },
    background: {
      default: '#f5f7fa',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <NotificationProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<AllNotifications />} />
            <Route path="/priority" element={<PriorityNotifications />} />
          </Routes>
        </Layout>
      </NotificationProvider>
    </ThemeProvider>
  );
}

export default App;
