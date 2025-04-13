const axios = require('axios');
require('dotenv').config();

const keitaroApi = axios.create({
  baseURL: process.env.KEITARO_API_URL,
  headers: {
    'Api-Key': process.env.KEITARO_API_KEY,
    'Content-Type': 'application/json'
  }
});

exports.getCampaigns = async () => {
  try {
    const response = await keitaroApi.get('/campaigns');
    return response.data;
  } catch (err) {
    console.error('Ошибка при получении кампаний:', err.response?.data || err.message);
    throw err;
  }
};
