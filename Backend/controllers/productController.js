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

// 2. Menambah Produk Baru + Gambar (POST)
exports.createProduct = async (req, res) => {
  try {
    const { name, price, stock } = req.body;
    // Tangkap nama file gambar dari multer jika user mengupload gambar
    const image = req.file ? req.file.filename : null; 

    const newProduct = await Product.create({ name, price, stock, image });
    res.status(201).json(newProduct);
  } catch (err) { 
    res.status(500).json({ error: err.message }); 
  }
};

// 3. Mengubah/Update Produk + Gambar (PUT)
exports.updateProduct = async (req, res) => {
  try {
    const { name, price, stock } = req.body;
    const { id } = req.params;

    const product = await Product.findByPk(id);
    if (!product) {
      return res.status(404).json({ message: 'Produk tidak ditemukan!' });
    }

    // Jika user upload gambar baru, pakai yang baru. Jika tidak, tetap gunakan nama gambar yang lama
    const image = req.file ? req.file.filename : product.image;

    await Product.update({ name, price, stock, image }, { where: { id } });
    res.json({ message: 'Produk sukses diperbarui!' });
  } catch (err) { 
    res.status(500).json({ error: err.message }); 
  }
};

// 4. Menghapus Produk (DELETE)
exports.deleteProduct = async (req, res) => {
  try {
    await Product.destroy({ where: { id: req.params.id } });
    res.json({ message: 'Produk sukses dihapus!' });
  } catch (err) { 
    res.status(500).json({ error: err.message }); 
  }
};