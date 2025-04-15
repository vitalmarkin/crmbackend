const express = require("express");
const router = express.Router();
const {
  getFormattedCampaigns,
  getTrafficReport,
} = require("../services/keitaroService");

// 📊 Получить список кампаний (чистый JSON)
router.get("/campaigns/clean", async (req, res) => {
  try {
    const result = await getFormattedCampaigns();
    res.json(result);
  } catch (err) {
    console.error("Ошибка при форматировании кампаний:", err);
    res.status(500).json({ error: "Ошибка при форматировании кампаний" });
  }
});

// 📈 Получить отчёт по трафику
router.get("/traffic", async (req, res) => {
  const { from, to, campaign_id } = req.query;
  console.log("[REQ PARAMS]", req.query);

  try {
    const report = await getTrafficReport({
      from: from || "2024-04-01",
      to: to || "2024-04-30",
      campaignId: campaign_id || 1,
    });

    res.json(report);
  } catch (err) {
    console.error("[TRAFFIC API ERROR]", err?.response?.data || err.message);
    res.status(500).send("Не удалось получить отчёт по трафику");
  }
});

module.exports = router;
