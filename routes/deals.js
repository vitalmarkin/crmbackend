// routes/deals.js
const express = require('express');
const router = express.Router();
const { createDeal, getDeals } = require('../controllers/dealController');

// POST /api/deals — создать сделку
router.post('/', createDeal);

// GET /api/deals — получить все сделки с фильтрацией
router.get('/', getDeals);

module.exports = router;
