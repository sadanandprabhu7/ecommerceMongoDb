const Product = require("../models/product");
const Order = require("../models/order");

exports.shopProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json({ data: products });
  } catch (e) {
    console.log(e);
  }
};

exports.postCart = async (req, res) => {
  try {
    const prodId = req.body.productId;
    const product = await Product.findById(prodId);
    await req.user.addToCart(product);
    res.json({ msg: "successfully added to cart" });
  } catch (e) {
    console.log(e);
  }
};
exports.getCart = async (req, res) => {
  try {
    const user = await req.user.populate("cart.items.productId");
    res.json({ data: user.cart.items });
  } catch (e) {
    console.log(e);
  }
};

exports.deleteFromCart = async (req, res) => {
  try {
    const prodId = req.body.productId;
    const result = await req.user.deleteFromCart(prodId);
    res.status(200).json({ msg: "successfully removed from cart" });
  } catch (e) {
    console.log(e);
  }
};

exports.postOrder = async (req, res) => {
  try {
    const user = await req.user.populate("cart.items.productId");
    const products = user.cart.items.map((i) => {
      return { quantity: i.quantity, product: { ...i.productId._doc } };
    });
    const order = new Order({
      user: {
        name: req.user.name,
        userId: req.user,
      },
      products: products,
    });
    order.save();
    req.user.clearCrat();
    res.status(200).json({ msg: "successfully Placed " });
  } catch (e) {
    console.log(e);
  }
};

exports.getOrders = async (req, res) => {
  try {
    const products = await Order.find({ "user.userId": req.user._id });
    res.json({ data: products });
  } catch (e) {
    console.log(e);
  }
};
