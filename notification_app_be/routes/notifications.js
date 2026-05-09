const express = require('express');
const router = express.Router();

// Mock data, in a real scenario this would connect to a DB
const mockNotifications = require('../data/mockData.json');

router.get('/', (req, res) => {
    try {
        const limit = parseInt(req.query.limit) || mockNotifications.notifications.length;
        const type = req.query.notification_type;

        let results = [...mockNotifications.notifications];

        if (type) {
            results = results.filter(n => n.Type === type);
        }

        res.status(200).json({ notifications: results.slice(0, limit) });
    } catch (error) {
        res.status(500).json({ error: 'Failed to fetch notifications' });
    }
});

module.exports = router;
