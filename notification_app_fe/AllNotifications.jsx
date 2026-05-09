import React, { useState, useEffect } from 'react';
import { 
  Typography, 
  Box, 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  Pagination, 
  CircularProgress,
  Paper
} from '@mui/material';
import { fetchNotifications } from './notifications';
import NotificationCard from './NotificationCard';

const AllNotifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [typeFilter, setTypeFilter] = useState('');
  const [page, setPage] = useState(1);
  const limit = 5;

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const params = {
        limit: limit,
        page: page,
        ...(typeFilter && { notification_type: typeFilter })
      };
      
      const data = await fetchNotifications(params);
      setNotifications(data);
      setLoading(false);
    };

    loadData();
  }, [typeFilter, page]);

  const handleFilterChange = (event) => {
    setTypeFilter(event.target.value);
    setPage(1); // Reset to first page when filter changes
  };

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  return (
    <Box>
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
        <Typography variant="h5" fontWeight="bold">
          All Notifications
        </Typography>
        
        <FormControl size="small" sx={{ minWidth: 150 }}>
          <InputLabel id="type-filter-label">Filter by Type</InputLabel>
          <Select
            labelId="type-filter-label"
            value={typeFilter}
            label="Filter by Type"
            onChange={handleFilterChange}
          >
            <MenuItem value=""><em>All Types</em></MenuItem>
            <MenuItem value="Placement">Placement</MenuItem>
            <MenuItem value="Result">Result</MenuItem>
            <MenuItem value="Event">Event</MenuItem>
          </Select>
        </FormControl>
      </Box>

      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
          <CircularProgress />
        </Box>
      ) : notifications.length === 0 ? (
        <Paper sx={{ p: 4, textAlign: 'center' }}>
          <Typography color="text.secondary">No notifications found.</Typography>
        </Paper>
      ) : (
        <Box>
          {notifications.map((notif) => (
            <NotificationCard key={notif.ID} notification={notif} />
          ))}
          
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
            <Pagination 
              count={10} // Assuming 10 pages for demo purposes since we don't have total count from fallback
              page={page} 
              onChange={handlePageChange} 
              color="primary" 
            />
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default AllNotifications;
