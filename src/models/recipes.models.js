const { connection } = require('../../db-connection');

class Recipe {
  static findMany(filters) {
    let sql = "SELECT * FROM recettes";
    // let sqlValues = [];
    // if (filters.title) {
    //   sql += ' WHERE title LIKE ?'
    //   sqlValues.push(`%${filters.title}%`);
    // }
    // if (filters.genre) {
    //   sql += ' WHERE genre = ?'
    //   sqlValues.push(`${filters.genre}`);
    // }
    return connection.promise().query(sql);
  }

  static findOneById(id) {
    const sql = "SELECT * FROM recettes WHERE id = ?";
    return connection.promise().query(sql, [id]);
  }

  static createOne(playlist) {
    const sql = "INSERT INTO recettes SET ?";
    return connection.promise().query(sql, [playlist]);
  }

  static updateOne(id, newRecipe) {
    const sql = "UPDATE recettes SET ? WHERE id = ?";
    return connection.promise().query(sql, [newRecipe, id]);
  }

  static deleteOne(id) {
    const sql = "DELETE FROM recettes WHERE id = ?";
    return connection.promise().query(sql, [id]);
  }

  static makeFavorite(userId, recipeId) {
    const sql = "INSERT INTO favoris SET ?";
    return connection.promise().query(sql, [userId, recipeId]);
  }

  static stopFavorite(userId, recipeId) {
    const sql = "DELETE FROM favoris WHERE user_id = ? AND recipe_id = ?";
    return connection.promise().query(sql, [userId, recipeId]);
  }

} 

module.exports = Recipe;