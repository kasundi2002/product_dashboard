// backend/routes/productRoutes.js
const express = require('express');
const multer = require('multer');
const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} = require('../controllers/productController');

const router = express.Router();

// Multer middleware for image uploads
const storage = multer.memoryStorage();
const upload = multer({ storage });

// http://localhost:8081/product/add
router.post('/add', upload.single('coverImage'), createProduct);

// http://localhost:8081/product/getAll
router.get('/getAll', getProducts);

// http://localhost:8081/product/get/:id
router.get('/get/:id', getProductById);

// http://localhost:8081/product/edit/:id
router.put('/edit/:id', upload.single('coverImage'), updateProduct);

// http://localhost:8081/product/delete/:id
router.delete('/delete/:id', deleteProduct);

module.exports = router;
