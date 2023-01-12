const Product = require("../models/product");
const mongoDb = require("mongodb");

exports.addProduct = (req, res) => {
  const { title, image, price } = req.body;
  const product = new Product({
    title: title,
    image: image,
    price: price,
    userId: req.user,
  });
  product
    .save() // here save method we have not define in product model it already given by mongoose
    .then((result) => {
      res.status(200).json({ msg: "product created" });
    })
    .catch((err) => {
      console.log(err);
    });
};

exports.adminProducts = async (req, res) => {
  const products = await Product.find();
  res.json({ data: products });
};

exports.productDelete = async (req, res) => {
  const id = req.params.productId;
  const result = await Product.findByIdAndRemove(id);
  //console.log(result);
  res.json({ msg: "deleted" });
};

exports.productEdit = async (req, res) => {
  const id = req.params.productId;
  const result = await Product.findById(id);
  //console.log(result);
  res.json({ data: result });
};

exports.updateProduct = async (req, res) => {
  const { updatedTitle, updatedImage, updatedPrice, _id } = req.body;
  Product.findById(_id)
    .then((product) => {
      product.title = updatedTitle;
      product.image = updatedImage;
      product.price = updatedPrice;
      return product.save();
    })
    .then((result) => {
      res.json({ data: result, msg: "updated" });
    });
};
