const mongodb = require("mongodb");

const env = require("dotenv");
env.config();

const MongoClient = mongodb.MongoClient;

const mongoConnect = (callback) => {
  MongoClient.connect(
    `mongodb+srv://${process.env.MONGO_DBUSERNAME}:${process.env.MONGO_DBPASS}@${process.env.MONGO_DBNAME}.thkr7qn.mongodb.net/?retryWrites=true&w=majority`
  )
    .then((client) => {
      console.log("connected");
      callback(client);
    })
    .catch((err) => {
      console.log(err);
    });
};

module.exports = mongoConnect;
