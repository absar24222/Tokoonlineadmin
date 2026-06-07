const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');

const Product = sequelize.define('Product', {
  name: { type: DataTypes.STRING, allowNull: false },
  price: { type: DataTypes.INTEGER, allowNull: false },
  stock: { type: DataTypes.INTEGER, allowNull: false },
  // Kolom baru untuk menampung nama file foto produk
  image: { type: DataTypes.STRING, allowNull: true } 
}, { tableName: 'products' });

module.exports = Product;