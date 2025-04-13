const express = require('express');
const router = express.Router();
const { getCampaigns, getFormattedCampaigns } = require('../services/keitaroService');

router.get('/campaigns', async (req, res) => {
  try {
    const campaigns = await getCampaigns();
    res.json(campaigns);
  } catch (err) {
    res.status(500).json({ error: 'Ошибка при получении данных с Keitaro' });
  }
});

module.exports = router;


router.get('/campaigns/table', async (req, res) => {
  try {
    const campaigns = await getFormattedCampaigns();

    let html = `
      <html>
      <head>
        <title>Keitaro Campaigns</title>
        <style>
          body { font-family: sans-serif; padding: 20px; }
          table { border-collapse: collapse; width: 100%; }
          th, td { border: 1px solid #ccc; padding: 8px; text-align: left; }
          th { background-color: #f4f4f4; }
        </style>
      </head>
      <body>
        <h2>Список кампаний Keitaro</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Название</th>
              <th>Включена</th>
              <th>Дата создания</th>
            </tr>
          </thead>
          <tbody>
    `;

    campaigns.forEach(c => {
      html += `
        <tr>
          <td>${c.ID}</td>
          <td>${c.Название}</td>
          <td>${c.Включена ? 'Да' : 'Нет'}</td>
          <td>${c["Дата создания"]}</td>
        </tr>
      `;
    });

    html += `
          </tbody>
        </table>
      </body>
      </html>
    `;

    res.send(html);
  } catch (err) {
  console.error('Ошибка Keitaro:', err.response?.data || err.message || err);
  res.status(500).send('Ошибка при загрузке данных из Keitaro');
  }
});


const { getTrafficReport } = require('../services/keitaroService');

router.get('/traffic', async (req, res) => {
  const { from, to, campaign_id } = req.query;

  try {
    const report = await getTrafficReport({
      from: from || '2024-04-01',
      to: to || '2024-04-30',
      campaignId: campaign_id || 1
    });

    // Формируем HTML-таблицу
    let html = `
      <html>
      <head>
        <title>Traffic Report</title>
        <style>
          body { font-family: sans-serif; padding: 20px; }
          table { border-collapse: collapse; width: 100%; }
          th, td { border: 1px solid #ccc; padding: 8px; text-align: left; }
          th { background-color: #f0f0f0; }
        </style>
      </head>
      <body>
        <h2>Отчёт по трафику кампании ${campaign_id}</h2>
        <table>
          <thead><tr>
    `;

    report.header.forEach(col => {
      html += `<th>${col}</th>`;
    });

    html += `</tr></thead><tbody>`;

    report.rows.forEach(row => {
      html += `<tr>`;
      row.forEach(cell => {
        html += `<td>${cell}</td>`;
      });
      html += `</tr>`;
    });

    html += `
        </tbody></table>
      </body></html>
    `;

    res.send(html);
  } catch (err) {
console.error('[KEITARO TRAFFIC ERROR]', JSON.stringify(err.response?.data || err.message || err));
    res.status(500).send('Не удалось получить отчёт по трафику');
  }
});
