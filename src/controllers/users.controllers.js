const { User } = require('../models');

const findManyUsers = async (req, res) => {
  try {
    const [results] = await User.findMany();
    if (results.length === 0) {
      res.status(200).send('Aucun user à afficher');
    } else {
      res.status(200).json(results)
    }
  } catch(err) {
    res.status(500).send(err.message);
  }
}

const findOneUserById = async (req, res) => {
  const id  = req.params.id ? req.params.id : req.id;
  const statusCode = res.method === "POST" ? "201" : "200";
  if (Number.isNaN(parseInt(id, 10))) {
    res.status(400).send('Vous devez renseigner une ID valide');
  } 
    try {
      const [results] = await User.findOne(id);
      if (results.length === 0) {
      res.status(400).send(`L'utilisateur avec l'id ${id} n'a pas été trouvé!`);
    } else {
      res.status(statusCode).json(results[0]);
    } 
  } catch (err) {
    res.status(500).send(err.message);
  }
}

const createOneUser = async (req, res, next) => {
  const { pseudo, email, password } = req.body;
  const hashedPassword = await User.hashPassword(password);
  try {
    const [result] = await User.createOne({pseudo, email, password: hashedPassword});
    console.log(result)
    req.id = result.insertId;
     next(); 
  } catch (err) {
    console.log('err', err)
  res.status(500).send(err.message);
  }
}

const updateOneUser = async (req, res, next) => {
  const { id } = req.params;
  const { pseudo, email, password } = req.body;
  let newUser = {};
  if (pseudo) {
    newUser.pseudo = pseudo;
  }
  if (email) {
    newUser.email = email;
  }
  if (password) {
    const hashedPassword = await User.hashPassword(newUser.password);
    newUser.password = hashedPassword
  }
  try {
    const [result] = await User.updateOne(id, newUser);
    if (result.affectedRows === 0) {
      res.status(404).send('La requête a échouée');
    } else {
      next();
    }
  } catch(err) {
    res.status(500).send(err.message);
  }
};

const deleteOneUser = async (req, res) => {
  const { id } = req.params;
  try {
    const [results] = await User.deleteOne(id);
    if (results.affectedRows > 0) {
      res.status(204).send('Utilisateur effacé avec succès');
    } else {
      res.status(404).send(`L'utilisateur avec l'id ${id} n'a pas été trouvé`)
    }
  } catch (err) {
    res.status(500).send(err.message);
  }
}

const verifyCredentials = async (req, res, next) => {
  const { email, password } = req.body;
  // /!\ mise en place de la connexion avec le pseudo à mettre en place /!\
  const [result] = await User.findOneByEmail(email);
  // Check de si l'email existe et s'il est trouvé par son id dans la BDD
  if (result.length === 0) {
    res.status(401).send("Email or Password wrong");
  } else {
    const validPassword = await User.verifyPassword(password, result[0].password);
    if (validPassword) {
      delete result[0].password;
      const [user] = result;
      req.user = user;
      next();
    } else {
      res.status(400).send("Email or Password wrong");
    }
  }
};

module.exports = {
  findManyUsers,
  findOneUserById,
  createOneUser,
  updateOneUser,
  deleteOneUser,
  verifyCredentials,
}