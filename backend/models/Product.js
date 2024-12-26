// backend/models/Product.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please provide a product name'],
    },
    description: {
      type: String,
      required: [true, 'Please provide a product description'],
    },
    price: {
      type: Number,
      required: [true, 'Please provide a product price'],
      min: [0, 'Price cannot be less than 0'],
    },
    category: {
      type: String,
      required: [true, 'Please provide a product category'],
    },
    stock: {
      type: Number,
      required: [true, 'Please provide the stock quantity'],
      min: [0, 'Stock cannot be less than 0'],
      default: 0,
    },
    coverImage: {
        data: {
            type: Buffer, // Stores the image as binary data
            required: true, // This should be part of the field object
        },
        contentType: {
            type: String, // Stores the MIME type of the image
            required: true, // This should be part of the field object
        },
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  {
    timestamps: true, // Adds createdAt and updatedAt fields
  }
);

module.exports = mongoose.model('Product', productSchema);
