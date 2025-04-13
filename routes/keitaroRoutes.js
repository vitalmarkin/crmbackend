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


exports.getFormattedCampaigns = async () => {
  const { data } = await keitaroApi.get('/campaigns');

  return data.map(c => ({
    ID: c.id,
    Название: c.name,
    Включена: c.enabled,
    "Дата создания": new Date(c.created_at).toLocaleDateString('ru-RU')
  }));
};
