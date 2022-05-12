const { connection } = require('../../db-connection');

class Recipe {
  static findMany(filter) {
    let sql = "SELECT * FROM recettes";
    let sqlValues = [];
    if (filter.recipeTime) {
      sql += ' WHERE temps_preparation <= ?';
      sqlValues.push(`${filter.recipeTime}`);
    }
    return connection.promise().query(sql, [sqlValues]);
  }

  static findOneById(id) {
    const sql = "SELECT * FROM recettes WHERE id_recette = ?";
    return connection.promise().query(sql, [id]);
  }

  static createOne(recipe) {
    const sql = "INSERT INTO recettes SET ?";
    return connection.promise().query(sql, [recipe]);
  }

  static updateOne(id, newRecipe) {
    const sql = "UPDATE recettes SET ? WHERE id_recette = ?";
    return connection.promise().query(sql, [newRecipe, id]);
  }

  static deleteOne(id) {
    const sql = "DELETE FROM recettes WHERE id_recette = ?";
    return connection.promise().query(sql, [id]);
  }

  static makeFavorite(favori) {
    const sql = "INSERT INTO favoris SET ?";
    return connection.promise().query(sql, [favori]);
  }

  static stopFavorite(userId, recipeId) {
    const sql = "DELETE FROM favoris WHERE user_id = ? AND recette_id = ?";
    return connection.promise().query(sql, [userId, recipeId]);
  }

  static findUserFavorites(id) {
    const sql = "SELECT nom_recette, id_recette FROM recettes AS r JOIN favoris AS f ON f.recette_id = r.id_recette JOIN users AS u ON u.id_user = f.user_id WHERE u.id_user= ?";
    return connection.promise().query(sql, [id]);
  }

} 

module.exports = Recipe;