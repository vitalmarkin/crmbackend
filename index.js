const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Ручка проверки
app.get('/', (req, res) => {
  res.send('CRM backend работает!');
});

// Роуты
const authRoutes = require('./routes/authRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const keitaroRoutes = require('./routes/keitaroRoutes');
const dealRoutes = require('./routes/deals');

app.use('/api/auth', authRoutes);
app.use('/api/upload', uploadRoutes);
app.use('/api/keitaro', keitaroRoutes);
app.use('/api/deals', dealRoutes);

// Запуск сервера
const PORT = process.env.PORT || 10000;
app.listen(PORT, () => {
  console.log(`Сервер запущен на порту ${PORT}`);
});
