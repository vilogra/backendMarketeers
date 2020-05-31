const mongoose = require("mongoose");
const Product = require("../models/products");

exports.getAll = (req, res, next) => {
  Product.find()
    .select("_id name description productImage")
    .exec()
    .then((docs) => {
      const count = {
        totalProducts: docs.length,
      };
      res.status(200).json({
        count,
        products: docs,
        message: "Get all product success",
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

exports.postProduct = (req, res, next) => {
  const product = new Product({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    description: req.body.description,
    productImage: req.file.path,
  });

  product
    .save()
    .then((result) => {
      res.status(200).json({
        createdProduct: result,
        message: "Add product success",
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

exports.getProductById = (req, res, next) => {
  const id = req.params.productId;
  Product.findById(id)
    .exec()
    .then((doc) => {
      if (doc) {
        res.status(200).json({
          product: doc,
          message: "Get product success",
        });
      } else {
        res.status(404).json({
          message: "Not found product, wrong ID",
        });
      }
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

exports.updateProduct = (req, res, next) => {
  const id = req.params.productId;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  Product.update(
    { _id: id },
    {
      $set: { updateOps },
    }
  )
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "Product updated",
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};

exports.deleteProduct = (req, res, next) => {
  const id = req.params.productId;
  Product.remove({ _id: id })
    .exec()
    .then((result) => {
      res.status(200).json({
        product: result,
        message: "Product deleted",
      });
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};
