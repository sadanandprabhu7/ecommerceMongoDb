const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const mongoose = require("mongoose");
const env = require("dotenv");
const path = require("path");
const shopProducts = require("./routes/shop");
const adminRoutes = require("./routes/admin");

const User = require("./models/user");

const app = express();

app.use(cors());

env.config();

app.use(bodyParser.json({ extended: false }));

app.use((req, res, next) => {
  User.findById("63bd845bb5638c1ac9ef7d89")
    .then((user) => {
      req.user = new User(
        user.name,
        user.email,
        user.phone,
        user.cart,
        user._id
      );
      next();
    })
    .catch((err) => {
      console.log(err);
    });
});

app.use(adminRoutes);
app.use(shopProducts);

//to deploye front end
// app.use((req, res) => {
//   res.sendFile(path.join(__dirname, `public/${req.url}`));
// });
mongoose
  .connect(
    `mongodb+srv://${process.env.MONGO_DBUSERNAME}:${process.env.MONGO_DBPASS}@${process.env.MONGO_DBNAME}.thkr7qn.mongodb.net/ecommerce?retryWrites=true&w=majority`
  )
  .then(app.listen(3000))
  .catch((err) => {
    console.log(err);
  });
