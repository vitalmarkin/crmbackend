// controllers/dealController.js
const { v4: uuidv4 } = require('uuid');

let deals = [];

// Добавить новую сделку
exports.createDeal = (req, res) => {
  const { country, offer, payout, cap, conditions } = req.body;

  if (!country || !offer || !payout || !cap || !conditions) {
    return res.status(400).json({ error: 'Заполни все поля сделки' });
  }

  const newDeal = {
    id: uuidv4(),
    country,
    offer,
    payout,
    cap,
    conditions,
    createdAt: new Date().toISOString()
  };

  deals.push(newDeal);
  res.status(201).json(newDeal);
};

// Получить все сделки (с фильтрацией)
exports.getDeals = (req, res) => {
  const { country, offer } = req.query;

  let filtered = [...deals];

  if (country) {
    filtered = filtered.filter(d => d.country.toLowerCase() === country.toLowerCase());
  }

  if (offer) {
    filtered = filtered.filter(d => d.offer.toLowerCase().includes(offer.toLowerCase()));
  }

  res.json(filtered);
};
