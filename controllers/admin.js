const Product = require("../models/product");
const mongoDb = require("mongodb");

exports.addProduct = (req, res) => {
  const { title, image, price } = req.body;
  const product = new Product(title, image, price);
  product
    .save()
    .then((result) => {
      console.log(result);
      res.status(200).json({ msg: "product created" });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.adminProducts = async (req, res) => {
  const products = await Product.fetchAll();
  res.json({ data: products });
};

exports.productDelete = async (req, res) => {
  const id = req.params.productId;
  console.log(id);
  const result = await Product.delete(id);
  //console.log(result);
  res.json({ msg: "deleted" });
};

exports.productEdit = async (req, res) => {
  const id = req.params.productId;
  console.log(id);
  const result = await Product.findbyId(id);
  //console.log(result);
  res.json({ data: result });
};

exports.updateProduct = async (req, res) => {
  const { updatedTitle, updatedImage, updatedPrice, _id } = req.body;
  const product = new Product(
    updatedTitle,
    updatedImage,
    updatedPrice,
    new mongoDb.ObjectId(_id)
  );
  const result = await product.save();
  console.log(result);
  res.json({ data: result, msg: "updated" });
};
