const { DataTypes } = require('sequelize');
const sequelize = require('../config/db');
const User = require('./User');
const Product = require('./Product');

const Order = sequelize.define('Order', {
  quantity: { type: DataTypes.INTEGER, allowNull: false },
  totalPrice: { type: DataTypes.INTEGER, allowNull: false }
}, { tableName: 'orders' });

// Relasi Tabel
User.hasMany(Order, { foreignKey: 'userId', onDelete: 'CASCADE' });
Order.belongsTo(User, { foreignKey: 'userId' });

Product.hasMany(Order, { foreignKey: 'productId', onDelete: 'CASCADE' });
Order.belongsTo(Product, { foreignKey: 'productId' });

module.exports = Order;