const Product = require('../models/Product');

// 1. Ambil Semua Produk (GET)
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.json(products);
  } catch (err) { 
    res.status(500).json({ error: err.message }); 
  }
};

// 2. Menambah Produk Baru (POST - Butuh Login)
exports.createProduct = async (req, res) => {
  try {
    const { name, price, stock } = req.body;
    const newProduct = await Product.create({ name, price, stock });
    res.status(201).json(newProduct);
  } catch (err) { 
    res.status(500).json({ error: err.message }); 
  }
};

// 3. Mengubah/Update Produk (PUT - Butuh Login) --> BAGIAN YANG DIUBAH
exports.updateProduct = async (req, res) => {
  try {
    const { name, price, stock } = req.body;
    const { id } = req.params;

    // Validasi: Cari tahu apakah produknya ada di database
    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ message: 'Produk tidak ditemukan!' });
    }

    // Jalankan perintah update data ke MySQL
    await Product.update({ name, price, stock }, { where: { id } });
    res.json({ message: 'Produk sukses diperbarui!' });
  } catch (err) { 
    res.status(500).json({ error: err.message }); 
  }
};

// 4. Menghapus Produk (DELETE - Butuh Login)
exports.deleteProduct = async (req, res) => {
  try {
    await Product.destroy({ where: { id: req.params.id } });
    res.json({ message: 'Produk sukses dihapus!' });
  } catch (err) { 
    res.status(500).json({ error: err.message }); 
  }
};