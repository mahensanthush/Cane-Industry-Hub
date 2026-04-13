const Product = require('../models/Product');


const getProducts = async (req, res) => {
  try {
    const products = await Product.find({}).sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const getMyProducts = async (req, res) => {
  try {
    const products = await Product.find({ user: req.user._id }).sort({ createdAt: -1 });
    res.json(products);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


const createProduct = async (req, res) => {
  try {

    console.log("Current User from Request:", req.user);

    const product = new Product({
      ...req.body,
      user: req.user._id
    });
    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


const updateProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      
      if (product.user.toString() !== req.user._id.toString()) {
        return res.status(401).json({ message: 'මෙම භාණ්ඩය සංස්කරණය කිරීමට ඔබට අවසර නැත.' });
      }

      const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
      res.json(updatedProduct);
    } else {
      res.status(404).json({ message: 'භාණ්ඩය හමු නොවීය.' });
    }
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};


const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (product) {
      
      if (product.user.toString() !== req.user._id.toString()) {
        return res.status(401).json({ message: 'මෙම භාණ්ඩය මකා දැමීමට ඔබට අවසර නැත.' });
      }

      await Product.findByIdAndDelete(req.params.id);
      res.json({ message: 'භාණ්ඩය සාර්ථකව මකා දමන ලදී.' });
    } else {
      res.status(404).json({ message: 'භාණ්ඩය හමු නොවීය.' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getProducts, getMyProducts, createProduct, updateProduct, deleteProduct };