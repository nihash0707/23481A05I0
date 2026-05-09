import axios from 'axios';
import localData from './data.json';
import { logWarning } from '../logging_middleware/logger';

const API_URL = 'http://4.224.186.213/evaluation-service/notifications';

export const fetchNotifications = async (params = {}) => {
  try {
    const response = await axios.get(API_URL, { params });
    return response.data.notifications;
  } catch (error) {
    logWarning("API unavailable, falling back to local data.", { error: error.message });
    
    // Simulate API filtering/pagination locally
    let results = [...localData.notifications];
    
    if (params.notification_type) {
      results = results.filter(n => n.Type === params.notification_type);
    }
    
    // Default sorting by timestamp descending (newest first)
    results.sort((a, b) => new Date(b.Timestamp) - new Date(a.Timestamp));
    
    const page = params.page ? parseInt(params.page) : 1;
    const limit = params.limit ? parseInt(params.limit) : results.length;
    
    const startIndex = (page - 1) * limit;
    const paginatedResults = results.slice(startIndex, startIndex + limit);
    
    return paginatedResults;
  }
};
