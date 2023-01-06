const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const mongoConnect = require("./util/database");
const env = require("dotenv");
const path = require("path");
//const shopProducts = require("./routes/main");

const app = express();

app.use(cors());

env.config();

app.use(bodyParser.json({ extended: false }));

app.use((req, res, next) => {
  // User.findByPk(1)
  //   .then((user) => {
  //     req.user = user;
  //     next();
  //   })
  //   .catch((err) => {
  //     console.log(err);
  //   });
});

//app.use(shopProducts);

//to deploye front end
// app.use((req, res) => {
//   res.sendFile(path.join(__dirname, `public/${req.url}`));
// });
mongoConnect((client) => {
  //console.log(client);
  app.listen(3000);
});
