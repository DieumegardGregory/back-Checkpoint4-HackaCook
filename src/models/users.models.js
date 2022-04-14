const argon2 = require("argon2");
const { connection } = require('../../db-connection');

class User {
  static findMany() {
    const sql = "SELECT * FROM users"
    return connection.promise().query(sql);
  }

  static findOne(id) {
    const sql = "SELECT * FROM users WHERE id_user = ?";
    return connection.promise().query(sql, [id]);
  }

  static createOne(user) {
    const sql = "INSERT INTO users SET ?"
    return connection.promise().query(sql, [user]);
  }

  static updateOne(id, user) {
    const sql = "UPDATE users SET ? WHERE id_user = ?";
    return connection.promise().query(sql, [user, id]);
  }

  static deleteOne(id) {
    const sql = "DELETE FROM users WHERE id_user = ?";
    return connection.promise().query(sql, [id]);
  }

  static async emailAlreadyExists(email) {
    const sql = "SELECT * FROM users WHERE email=?";
    const [results] = await connection.promise().query(sql, [email]);
    return results.length > 0;
  }

  static findOneByEmail(email) {
    const sql = "SELECT * FROM users WHERE email=?";
    return connection.promise().query(sql, [email]);
  }

  static async hashPassword(password) {
    const hashedPassword = await argon2.hash(password);
    return hashedPassword;
  }

  static async verifyPassword(password, hashed_Password) {
    const valid = await argon2.verify(hashed_Password, password);
    return valid;
  }

  static validatePassword(password) {
    return password.length >= 8;
  }

 }

 module.exports = User;