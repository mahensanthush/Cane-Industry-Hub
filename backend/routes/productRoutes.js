const express = require('express');
const router = express.Router();
const { 
  getProducts, 
  getMyProducts, 
  createProduct, 
  updateProduct, 
  deleteProduct 
} = require('../controllers/productController');
const { protect } = require('../middleware/authMiddleware');


router.get('/myproducts', protect, getMyProducts);


router.get('/', getProducts);
router.post('/', protect, createProduct);


router.put('/:id', protect, updateProduct);
router.delete('/:id', protect, deleteProduct);

module.exports = router;