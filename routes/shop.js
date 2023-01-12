const express = require("express");

const shopControllers = require("../controllers/shop");

const router = express.Router();

router.get("/products", shopControllers.shopProducts);
router.post("/postCart", shopControllers.postCart);
router.get("/getCart", shopControllers.getCart);
router.post("/deleteFromCart", shopControllers.deleteFromCart);
router.post("/postOrder", shopControllers.postOrder);
// router.get("/getOrders", shopControllers.getOrders);

module.exports = router;
