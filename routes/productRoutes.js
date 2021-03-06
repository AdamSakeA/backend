import express from 'express';
import multer from 'multer';
import path from 'path'
import { getProduk, getProdukByName, getProdukById, saveProduk, updateProduk, deleteProduk } from '../controllers/produkController.js';
import { verifyToken } from "../middleware/verifyToken.js";


const router = express.Router();
router.use(express.static(path.join("assets")))

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './assets/')
    },
    filename: function (req, file, cb) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, file.fieldname + '-' + uniqueSuffix)
    }
  })

const upload = multer({ storage: storage })

router.get('/products', getProduk);
router.get('/products/:id', verifyToken, getProdukById);
router.get('/product/:id', getProdukByName);
router.post('/products', upload.single('img'), saveProduk);
router.patch('/products/:id', verifyToken, upload.single('img'), updateProduk);
router.delete('/products/:id', verifyToken, deleteProduk);

export default router;