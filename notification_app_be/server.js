const express = require('express');
const cors = require('cors');
const { logInfo, logError } = require('../logging_middleware/logger');
const notificationRoutes = require('./routes/notifications');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

// Request logging middleware
app.use((req, res, next) => {
    logInfo(`Incoming request: ${req.method} ${req.url}`);
    next();
});

// Routes
app.use('/api/notifications', notificationRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
    logError('Unhandled error in backend', err);
    res.status(500).json({ error: 'Internal Server Error' });
});

app.listen(PORT, () => {
    logInfo(`Notification Microservice backend running on port ${PORT}`);
});
