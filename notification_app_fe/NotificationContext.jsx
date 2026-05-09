import React, { createContext, useContext, useState, useEffect } from 'react';

const NotificationContext = createContext();

export const useNotifications = () => useContext(NotificationContext);

export const NotificationProvider = ({ children }) => {
  const [viewedIds, setViewedIds] = useState(() => {
    const saved = localStorage.getItem('viewedNotifications');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('viewedNotifications', JSON.stringify(viewedIds));
  }, [viewedIds]);

  const markAsViewed = (id) => {
    if (!viewedIds.includes(id)) {
      setViewedIds((prev) => [...prev, id]);
    }
  };

  const isViewed = (id) => viewedIds.includes(id);

  return (
    <NotificationContext.Provider value={{ markAsViewed, isViewed }}>
      {children}
    </NotificationContext.Provider>
  );
};
