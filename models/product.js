const getDb = require("../util/database").getDb;
const mongoDb = require("mongodb");

class Product {
  constructor(title, image, price, id, userId) {
    this.title = title;
    this.image = image;
    this.price = price;
    this._id = id;
    this.userId = userId;
  }
  save() {
    const db = getDb();
    let dbOp;
    if (this._id) {
      dbOp = db
        .collection("products")
        .updateOne({ _id: new mongoDb.ObjectId(this._id) }, { $set: this });
      //.updateOne({ _id: new mongoDb.ObjectId(this._id) }, { $set: {title:this.title} and so on});
    } else {
      dbOp = db.collection("products").insertOne(this);
    }
    return dbOp
      .then((result) => {
        console.log(result);
        // return result;
      })
      .catch((err) => {
        console.log(err);
      });
  }
  static fetchAll() {
    const db = getDb();
    return db
      .collection("products")
      .find()
      .toArray()
      .then((products) => {
        //  console.log(products);
        return products;
      })
      .catch((err) => {
        console.log(err);
      });
  }
  static delete(productId) {
    const db = getDb();
    return db
      .collection("products")
      .deleteOne({ _id: new mongoDb.ObjectId(productId) })
      .then((product) => {
        console.log(product);
        return product;
      })
      .catch((err) => {
        console.log(err);
      });
  }
  static findById(productId) {
    const db = getDb();
    return db
      .collection("products")
      .find({ _id: new mongoDb.ObjectId(productId) })
      .toArray()
      .then((product) => {
        console.log(product);
        return product;
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

module.exports = Product;
