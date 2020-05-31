const express = require("express");
const router = express.Router();
const multer = require("multer");
const productController = require("../controllers/products");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "/uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
    cb(null, true);
  } else {
    cb(new Error("File type doesn't supported"), false);
  }
};

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
  fileFilter: fileFilter,
});

router.get("/products", productController.getAll);
router.get("/products/:productId", productController.getProductById);
router.post(
  "/products",
  upload.single("productImage"),
  productController.postProduct
);
router.patch("/products/:productId", productController.updateProduct);
router.delete("/products/:productId", productController.deleteProduct);

module.exports = router;
