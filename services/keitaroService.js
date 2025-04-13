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

exports.getFormattedCampaigns = async () => {
  const { data } = await keitaroApi.get('/campaigns');

  return data.map(c => ({
    ID: c.id,
    Название: c.name,
    Включена: c.enabled,
    "Дата создания": new Date(c.created_at).toLocaleDateString('ru-RU')
  }));
};

exports.getTrafficReport = async ({ from, to, campaignId }) => {
  const params = {
    range: 'custom',
    date_from: from,
    date_to: to,
    filters: [{ name: 'campaign_id', operator: 'EQUALS', expression: campaignId }],
    columns: ['campaign_name', 'visits', 'clicks', 'conversions', 'revenue', 'cost', 'profit', 'roi']
  };

  const { data } = await keitaroApi.post('/report/traffic/table', params);
  return data;
};

