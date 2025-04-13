const express = require('express');
const router = express.Router();
const { getCampaigns } = require('../services/keitaroService');

router.get('/campaigns', async (req, res) => {
  try {
    const campaigns = await getCampaigns();
    res.json(campaigns);
  } catch (err) {
    res.status(500).json({ error: 'Ошибка при получении данных с Keitaro' });
  }
});

module.exports = router;


