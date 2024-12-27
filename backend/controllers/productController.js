// backend/controllers/productController.js
const Product = require('./../models/Product');

const createProduct = async (req, res) => {
  console.log(`Inside create product`)
    try {
        const { name, description, price, category, stock, } = req.body;

        if (!req.file) {
            return res.status(400).json({ message: 'Cover image is required' });
        }

        const newProduct = new Product({
            name, 
            description, 
            price, 
            category, 
            stock,
            coverImage: {
                data: req.file.buffer, // Binary data from multer
                contentType: req.file.mimetype, // MIME type (e.g., image/jpeg)
            },
        });

        const savedProduct = await newProduct.save();
        res.status(201).json(savedProduct);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

const getProducts = async (req, res) => {
  console.log(`Inside get products controller`);
  try {
    const products = await Product.find();
    console.log(`Inside get products controller:${products}`);
    
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

const getProductById = async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

//Update a book
const updateProduct = async (req, res) => {
    try {
        const { name, description, price, category, stock } = req.body;
        console.log(`Inside update product controller: ${name} , ${description} , ${price} ${category} ${stock}`);
        
        const productId = req.params.id;
        const product = await Product.findById(productId);
        
        if (!product) {
            return res.status(404).json({ message: 'Product not found' });
        }

        // Update fields if provided in the request
        if (name) product.name = name;
        if (description) product.description = description;
        if (price) product.price = price;
        if (category) product.category = category;
        if (stock) product.stock = stock;

        // Check if a new cover image is provided (using multer)
        if (req.file) {
            product.coverImage = {
                data: req.file.buffer, // Binary data from multer
                contentType: req.file.mimetype, // MIME type (e.g., image/jpeg)
            };
        }

        const updatedProduct = await product.save({ w: 1 }); // Disable majority write concern

        
        res.status(200).json(updatedProduct); // Return updated product

    } catch (error) {
        console.error('Error updating product:', error.message);
        res.status(500).json({ error: error.message }); // Log error message to console for debugging
    }
};

const deleteProduct = async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);

    if (!product) {
      return res.status(404).json({ message: 'Product not found' });
    }

    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
};

module.exports = {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
};
