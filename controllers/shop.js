// const Product = require("../models/product");
// let ITEMS_PER_PAGE = 2;
// exports.shopProducts = (req, res, next) => {
//   const page = +req.query.page || 1;
//   let totalItems;
//   Product.count()
//     .then((total) => {
//       totalItems = total;
//       return Product.findAll({
//         offset: (page - 1) * ITEMS_PER_PAGE,
//         limit: ITEMS_PER_PAGE,
//       });
//     })
//     .then((products) => {
//       res.json({
//         products: products,

//         currentPage: page,
//         hasNextPage: ITEMS_PER_PAGE * page < totalItems,
//         hasPriviousPage: page > 1,
//         nextPage: page + 1,
//         previosPage: page - 1,
//         lastPage: Math.ceil(totalItems / ITEMS_PER_PAGE),
//       });
//     })
//     .catch((err) => console.log(err));
// };

const Product = require("../models/product");

exports.shopProducts = async (req, res) => {
  const products = await Product.find();
  res.json({ data: products });
};

exports.postCart = async (req, res) => {
  const prodId = req.body.productId;
  Product.findById(prodId)
    .then((product) => {
      return req.user.addToCart(product);
    })
    .then((result) => {
      res.json({ msg: "successfully added to cart" });
    });
};
exports.getCart = async (req, res) => {
  req.user.getCart().then((products) => {
    res.json({ data: products });
  });
};

exports.deleteFromCart = (req, res) => {
  const prodId = req.body.productId;
  console.log(prodId);
  req.user.deleteFromCart(prodId).then((result) => {
    res.status(200).json({ msg: "successfully removed from cart" });
  });
};

exports.postOrder = (req, res) => {
  req.user.addOrder().then((result) => {
    res.status(200).json({ msg: "successfully Placed " });
  });
};

exports.getOrders = async (req, res) => {
  req.user.getOrders().then((products) => {
    res.json({ data: products });
  });
};
