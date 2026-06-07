const express = require('express');
const cors = require('cors');
const path = require('path'); // Tambahan untuk pathing static folder
require('dotenv').config();
const sequelize = require('./Backend/config/db');

// Import Rute
const authRoutes = require('./Backend/routes/authRoutes');
const productRoutes = require('./Backend/routes/productRoutes');
const orderRoutes = require('./Backend/routes/orderRoutes');

const app = express();

// Middleware Global
app.use(cors());
app.use(express.json());

// Mengizinkan folder 'uploads' diakses publik secara statis lewat URL
app.use('/uploads', express.static(path.join(__dirname, 'Backend', 'uploads')));

// Mapping Rute Utama
app.use('/api/auth', authRoutes);
app.use('/api/products', productRoutes);
app.use('/api/orders', orderRoutes);

// Jalankan Server & Sinkronisasi Database
const PORT = process.env.PORT || 5000;
sequelize.sync({ alter: true })
  .then(() => {
    console.log('✓ Database MySQL Terkoneksi & Sinkron');
    app.listen(PORT, () => console.log(`✓ Server berjalan di http://localhost:${PORT}`));
  })
  .catch(err => console.error('✗ Gagal konek database:', err));