const Product = require('../models/productModel');
const cloudinary = require('../config/cloudinary');
const multer = require('multer');

const storage = multer.diskStorage({});
const upload = multer({ storage });

exports.uploadProducts = [
  upload.array('images', 5), // max 5 images
  async (req, res) => {
    try {
      const { name, price } = req.body;
      const files = req.files;

      const uploadedUrls = await Promise.all(
        files.map(file =>
          cloudinary.uploader.upload(file.path, { folder: 'products' }),
        ),
      );

      const imageUrls = uploadedUrls.map(u => u.secure_url);

      const product = await Product.create({ name, price, images: imageUrls });

      res.json(product);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
];

exports.getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
