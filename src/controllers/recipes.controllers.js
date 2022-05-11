const { Recipe } = require('../models');

const findManyRecipes = async (req, res) => {
  const { recipeTime } = req.query;
  let filter = { recipeTime };
  try {
    const [results] = await Recipe.findMany(filter);
    if (results.length === 0) {
      res.status(200).send('Aucune recette disponible');
    } else {
      res.status(200).json(results)
    }
  } catch(err) {
    res.status(500).send(err.message);
  }
}

const findOneRecipeById = async (req, res) => {
  const id = req.params.id ? req.params.id : req.id;
  const statusCode = res.method === "POST" ? "201" : "200";
  if (Number.isNaN(parseInt(id, 10))) {
    res.status(400).send('Vous devez renseigner une ID valide');
  } 
    try {
      const [results] = await Recipe.findOneById(id);
      if (results.length === 0) {
      res.status(400).send(`La recette avec l'id ${id} n'a pas été trouvée!`);
    } else {
      res.status(statusCode).json(results[0]);
    } 
  } catch (err) {
    res.status(500).send(err.message);
  }
}

const createOneRecipe = async (req, res, next) => {
  const formData = JSON.parse(JSON.stringify(req.body))
  const { temps_preparation, nb_personnes, nom_recette, instructions_recette } = formData;
  const image_recette = req.file.filename;
  try {
    const [result] = await Recipe.createOne({ temps_preparation, nb_personnes, nom_recette, image_recette, instructions_recette });
    if (result.affectedRows === 0) {
      res.status(400).send('La requête a échouée');
    } else {
      req.id = result.insertId;
      next();
    }
  } catch (err) {
  res.status(500).send(err.message);
  }
}

const updateOneRecipe = async (req, res, next) => {
  const { id } = req.params;
  const formData = JSON.parse(JSON.stringify(req.body))
  const { temps_preparation, nb_personnes, nom_recette, instructions_recette } = formData;
  const image_recette = req.file.filename;
  const newRecipe = {};
  if (temps_preparation) {
    newRecipe.temps_preparation = temps_preparation;
  }
  if (nb_personnes) {
    newRecipe.nb_personnes = nb_personnes;
  }
  if (nom_recette) {
    newRecipe.nom_recette = nom_recette;
  }
  if (image_recette) {
    newRecipe.image_recette = req.file.filename;
  }
  if (instructions_recette) {
    newRecipe.instructions_recette = instructions_recette;
  }
  
  try { 
    const [result] = await Recipe.updateOne(id, newRecipe);
    if (result.affectedRows === 0) {
      res.status(404).send('La requête a échouée');
    } else {
      next();
    }
  } catch(err) {
    res.status(500).send(err.message);
  }
};

const deleteOneRecipe = async (req, res) => {
  const { id } = req.params;
  try {
    const [results] = await Recipe.deleteOne(id);
    if (results.affectedRows > 0) {
      res.status(204).send('Recette effacée avec succès');
    } else {
      res.status(404).send(`La recette avec l'id ${id} n'a pas été trouvée`)
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
}

const makeOneFavorite = async (req, res) => {
  const { recette_id, user_id } = req.body;
  try {
    const [result] = await Recipe.makeFavorite({user_id, recette_id});
    if (result.affectedRows === 0) {
      res.status(404).send('La requête a échouée');
    } else {
      res.status(201).send('Favori enregistré!');
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
}

const stopOneFavorite = async (req, res) => {
  const { userId, recipeId } = req.params;
  try {
    const [result] = await Recipe.stopFavorite(userId, recipeId);
    if (result.affectedRows === 0) {
      res.status(404).send('La requête a échouée');
    } else {
      res.status(204).send('Favori supprimé!');
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
}

const getAllFavorites = async (req, res) => {
  const { id } = req.params;
  try {
    const [results] = await Recipe.findUserFavorites(id);
    console.log(results)
    if (results.length === 0) {
      res.status(200).json(results);
    } else {
      res.status(200).json(results);
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
}


module.exports = {
  findManyRecipes,
  findOneRecipeById,
  createOneRecipe,
  updateOneRecipe,
  deleteOneRecipe,
  makeOneFavorite, 
  stopOneFavorite,
  getAllFavorites,
}