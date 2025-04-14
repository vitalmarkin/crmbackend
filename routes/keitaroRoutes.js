const express = require("express");
const router = express.Router();
const { getFormattedCampaigns, getTrafficReport } = require("../services/keitaroService");

// Получение списка кампаний (таблица)
router.get("/campaigns/table", async (req, res) => {
  try {
    const campaigns = await getFormattedCampaigns();

    let html = `
      <html><head><title>Кампании</title><style>
      table { border-collapse: collapse; width: 100%; }
      th, td { border: 1px solid #ccc; padding: 8px; }
      </style></head><body>
      <h1>Список кампаний</h1>
      <table><thead><tr><th>ID</th><th>Название</th><th>Вкл</th><th>Дата</th></tr></thead><tbody>
    `;

    campaigns.forEach((c) => {
      html += `<tr><td>${c.ID}</td><td>${c.Название}</td><td>${c.Включена ? "Да" : "Нет"}</td><td>${c["Дата создания"]}</td></tr>`;
    });

    html += `</tbody></table></body></html>`;
    res.send(html);
  } catch (err) {
    console.error("Ошибка получения кампаний:", err);
    res.status(500).send("Не удалось получить кампании");
  }
});

// Получение списка кампаний (чистый JSON)
router.get("/campaigns/clean", async (req, res) => {
  try {
    const result = await getFormattedCampaigns();
    res.json(result);
  } catch (err) {
    console.error("Ошибка при форматировании кампаний:", err);
    res.status(500).json({ error: "Ошибка при форматировании кампаний" });
  }
});

// Получение отчета по трафику
router.get("/traffic", async (req, res) => {
  const { from, to, campaign_id } = req.query;
  console.log("[REQ PARAMS]", req.query);

  try {
    const report = await getTrafficReport({
      from: from || "2024-04-01",
      to: to || "2024-04-30",
      campaignId: campaign_id || 1
    });

    res.json(report);
  } catch (err) {
    console.error("[KEITARO TRAFFIC ERROR]", err.response?.data || err.message || err);
    res.status(500).send("Не удалось получить отчёт по трафику");
  }
});

module.exports = router;
