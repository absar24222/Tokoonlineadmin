const Order = require('../models/Order');
const Product = require('../models/Product');
const User = require('../models/User');

exports.createOrder = async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const userId = req.user.id;

    const product = await Product.findByPk(productId);
    if (!product) return res.status(404).json({ message: 'Produk tidak ditemukan!' });
    if (product.stock < quantity) return res.status(400).json({ message: 'Stok tidak cukup.' });

    const totalPrice = product.price * quantity;
    const newOrder = await Order.create({ userId, productId, quantity, totalPrice });

    product.stock -= quantity;
    await product.save();

    res.status(201).json({ message: 'Transaksi berhasil!', order: newOrder });
  } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await Order.findAll({
      include: [
        { model: User, attributes: ['id', 'username', 'email'] },
        { model: Product, attributes: ['id', 'name', 'price'] }
      ]
    });
    res.json(orders);
  } catch (err) { res.status(500).json({ error: err.message }); }
};