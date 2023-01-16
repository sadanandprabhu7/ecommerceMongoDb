const Product = require("../models/product");
const mongoDb = require("mongodb");

exports.addProduct = async (req, res) => {
  try {
    const { title, image, price } = req.body;
    const product = new Product({
      title: title,
      image: image,
      price: price,
      userId: req.user,
    });
    await product.save(); // here save method we have not define in product model it already given by mongoose

    res.status(200).json({ msg: "product created" });
  } catch (err) {
    console.log(err);
  }
};

exports.adminProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json({ data: products });
  } catch (e) {
    console.log(e);
  }
};

exports.productDelete = async (req, res) => {
  try {
    const id = req.params.productId;
    const result = await Product.findByIdAndRemove(id);
    res.status(200).json({ msg: "deleted" });
  } catch (e) {
    console.log(e);
  }
};

exports.productEdit = async (req, res) => {
  try {
    const id = req.params.productId;
    const result = await Product.findById(id);
    res.json({ data: result });
  } catch (e) {
    console.log(e);
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { updatedTitle, updatedImage, updatedPrice, _id } = req.body;
    const product = await Product.findById(_id);
    product.title = updatedTitle;
    product.image = updatedImage;
    product.price = updatedPrice;
    product.save();
    res.json({ data: product, msg: "updated" });
  } catch (e) {
    console.log(e);
  }
};
