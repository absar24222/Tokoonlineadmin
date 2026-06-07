const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');
const authMiddleware = require('../middleware/auth');
const upload = require('../middleware/upload'); // Import middleware multer

router.get('/', productController.getAllProducts);

// Sisipkan upload.single('image') setelah authMiddleware
router.post('/', authMiddleware, upload.single('image'), productController.createProduct);
router.put('/:id', authMiddleware, upload.single('image'), productController.updateProduct);
router.delete('/:id', authMiddleware, productController.deleteProduct);

module.exports = router;