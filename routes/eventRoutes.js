const express = require('express');
const eventController = require('../controllers/eventController');
const { verifyAdminToken } = require('../middlewares/authMiddleware');

const router = express.Router();

router.post('/', verifyAdminToken, eventController.createEvent);
router.get('/', eventController.getEvents);
router.get('/:id', eventController.getEventById);

router.delete('/:id', verifyAdminToken, eventController.deleteEvent);

router.put('/:id', verifyAdminToken, eventController.updateEvent);

module.exports = router;
