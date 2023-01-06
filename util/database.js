const mongodb = require("mongodb");
const env = require("dotenv");
env.config();
const MongoClient = mongodb.MongoClient;

let db;
const mongoConnect = (callback) => {
  MongoClient.connect(
    `mongodb+srv://${process.env.MONGO_DBUSERNAME}:${process.env.MONGO_DBPASS}@${process.env.MONGO_DBNAME}.thkr7qn.mongodb.net/ecommerce?retryWrites=true&w=majority`
  )
    .then((client) => {
      db = client.db();
      console.log("connected");
      callback();
    })
    .catch((err) => {
      console.log(err);
    });
};

const getDb = () => {
  if (db) {
    return db;
  }
  throw "no database found";
};
exports.mongoConnect = mongoConnect;
exports.getDb = getDb;
