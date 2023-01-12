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
  User.findById("63bf5317e3fa48f366a4578e")
    .then((user) => {
      req.user = user;
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
  .then((result) => {
    User.findOne().then((user) => {
      if (!user) {
        const user = new User({
          name: "sadanand",
          email: "sada1@gmail.com",
          cart: { items: [] },
        });
        user.save();
      }
    });

    app.listen(3000);
  })
  .catch((err) => {
    console.log(err);
  });
