const Product = require("../models/product");

exports.addProduct = (req, res) => {
  const { title, image, price } = req.body;
  console.log(title);
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
