import Product from '../models/productModel.js';
import cloudinary from '../config/cloudinary.js';
import multer from 'multer';

/* =========================
   MULTER SETUP
========================= */
const storage = multer.diskStorage({});
const upload = multer({ storage });

/* =========================
   UPLOAD PRODUCTS
========================= */
export const uploadProducts = [
  upload.array('images', 5),

  async (req, res) => {
    try {
      const { name, price } = req.body;
      const files = req.files;

      if (!files || files.length === 0) {
        return res.status(400).json({ error: 'No images uploaded' });
      }

      const uploadedUrls = await Promise.all(
        files.map(file =>
          cloudinary.uploader.upload(file.path, {
            folder: 'products',
          }),
        ),
      );

      const imageUrls = uploadedUrls.map(u => u.secure_url);

      const product = await Product.create({
        name,
        price,
        images: imageUrls,
      });

      res.status(201).json(product);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  },
];

/* =========================
   GET PRODUCTS
========================= */
export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
