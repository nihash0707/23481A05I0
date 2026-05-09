import React, { useState, useEffect } from 'react';
import { 
  Typography, 
  Box, 
  CircularProgress,
  Paper,
  TextField
} from '@mui/material';
import { fetchNotifications } from './notifications';
import NotificationCard from './NotificationCard';

const PriorityNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [limit, setLimit] = useState(10);

  useEffect(() => {
    const loadPriorityData = async () => {
      setLoading(true);
      // Fetch a large number to ensure we get enough to sort by priority locally
      // In a real app, this would be handled by a specific backend endpoint
      const data = await fetchNotifications({ limit: 100 });
      
      const typeWeight = {
        'Placement': 3,
        'Result': 2,
        'Event': 1
      };

      const sortedData = [...data].sort((a, b) => {
        const weightA = typeWeight[a.Type] || 0;
        const weightB = typeWeight[b.Type] || 0;
        
        if (weightA !== weightB) {
          return weightB - weightA; // Higher weight first
        }
        
        // If weights are equal, sort by recency
        return new Date(b.Timestamp) - new Date(a.Timestamp);
      });

      setNotifications(sortedData.slice(0, limit));
      setLoading(false);
    };

    const timer = setTimeout(() => {
      loadPriorityData();
    }, 300); // debounce limit changes

    return () => clearTimeout(timer);
  }, [limit]);

  const handleLimitChange = (e) => {
    const value = parseInt(e.target.value, 10);
    if (!isNaN(value) && value > 0) {
      setLimit(value);
    } else if (e.target.value === '') {
      setLimit('');
    }
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" fontWeight="bold">
          Priority Inbox
        </Typography>
        
        <TextField
          label="Top 'n' Notifications"
          type="number"
          size="small"
          value={limit}
          onChange={handleLimitChange}
          slotProps={{ htmlInput: { min: 1, max: 50 } }}
          sx={{ width: 150 }}
        />
      </Box>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
          <CircularProgress />
        </Box>
      ) : notifications.length === 0 ? (
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <Typography color="text.secondary">No priority notifications found.</Typography>
        </Paper>
      ) : (
        <Box>
          {notifications.map((notif) => (
            <NotificationCard key={notif.ID} notification={notif} />
          ))}
        </Box>
      )}
    </Box>
  );
};

export default PriorityNotifications;
