import React from 'react';
import { Card, CardContent, Typography, Box, Chip, ButtonBase } from '@mui/material';
import { useNotifications } from './NotificationContext';
import { format } from 'date-fns';

const NotificationCard = ({ notification }) => {
  const { ID, Type, Message, Timestamp } = notification;
  const { isViewed, markAsViewed } = useNotifications();
  const viewed = isViewed(ID);

  const handleClick = () => {
    markAsViewed(ID);
  };

  const getChipColor = (type) => {
    switch (type) {
      case 'Placement': return 'success';
      case 'Result': return 'warning';
      case 'Event': return 'info';
      default: return 'default';
    }
  };

  return (
    <Card 
      sx={{ 
        mb: 2, 
        borderLeft: viewed ? '4px solid transparent' : '4px solid #1976d2',
        backgroundColor: viewed ? '#ffffff' : '#f8fbff',
        transition: 'all 0.2s ease-in-out',
        '&:hover': {
          boxShadow: 3,
          transform: 'translateY(-2px)'
        }
      }}
    >
      <ButtonBase 
        onClick={handleClick} 
        sx={{ 
          width: '100%', 
          justifyContent: 'flex-start', 
          textAlign: 'left',
          p: 2
        }}
      >
        <Box sx={{ width: '100%' }}>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
            <Chip 
              label={Type} 
              color={getChipColor(Type)} 
              size="small" 
              sx={{ fontWeight: 'bold' }}
            />
            <Typography variant="caption" color="text.secondary">
              {format(new Date(Timestamp), 'MMM dd, yyyy HH:mm')}
            </Typography>
          </Box>
          <Typography 
            variant="body1" 
            sx={{ 
              fontWeight: viewed ? 'normal' : 'bold',
              color: viewed ? 'text.secondary' : 'text.primary'
            }}
          >
            {Message}
          </Typography>
        </Box>
      </ButtonBase>
    </Card>
  );
};

export default NotificationCard;
