const axios = require("axios");

const keitaroApi = axios.create({
  baseURL: process.env.KEITARO_API_URL,
  headers: {
    "Api-Key": process.env.KEITARO_API_KEY
    // Убираем Content-Type — Keitaro сам определяет формат
  },
});

exports.getCampaigns = async () => {
  try {
    const response = await keitaroApi.get("/campaigns");
    return response.data;
  } catch (err) {
    console.error("Ошибка при получении кампаний:", err.response?.data || err.message);
    throw err;
  }
};

exports.getFormattedCampaigns = async () => {
  const { data } = await keitaroApi.get("/campaigns");

  return data.map((c) => ({
    ID: c.id,
    Название: c.name,
    Включена: c.enabled,
    "Дата создания": new Date(c.created_at).toLocaleDateString("ru-RU"),
  }));
};

// ВРЕМЕННЫЙ ТЕСТОВЫЙ ЗАПРОС — просто получаем список кампаний
exports.getTrafficReport = async ({ from, to, campaignId }) => {
  console.log("[KEITARO TEST MODE]");
  try {
    const response = await keitaroApi.get("/campaigns");
    console.log("[KEITARO RESPONSE SAMPLE]", response.data?.[0]);
    return { rows: [["Тест", 0, 0, 0, 0]] };
  } catch (err) {
    console.error("[KEITARO TEST ERROR]", err?.response?.data || err.message);
    throw err;
  }
};
