const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Пример API-ручки
app.get('/', (req, res) => {
  res.send('CRM backend работает!');
});

// Импортируем и подключаем маршруты (если они есть)
const authRoutes = require('./routes/authRoutes');
const uploadRoutes = require('./routes/uploadRoutes');

app.use('/api/auth', authRoutes);
app.use('/api/upload', uploadRoutes);

// Старт сервера
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Сервер запущен на порту ${PORT}`));

const keitaroRoutes = require('./routes/keitaroRoutes');
app.use('/api/keitaro', keitaroRoutes);
