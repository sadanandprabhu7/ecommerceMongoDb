const getDb = require("../util/database").getDb;

class User {
  constructor(name, email, phone) {
    this.name = name;
    this.email = email;
    this.phone = phone;
  }

  save() {
    const db = getDb();
    return db
      .collection("users")
      .insertOne(this)
      .toString()
      .then((users) => {
        console.log(users);
      })
      .catch((err) => {
        console.log(err);
      });
  }
}

module.exports = User;
