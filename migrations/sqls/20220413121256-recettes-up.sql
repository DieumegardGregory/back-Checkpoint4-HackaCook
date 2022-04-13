CREATE TABLE IF NOT EXISTS `recettes` (
  `id_recette` INT AUTO_INCREMENT PRIMARY KEY,
  `temps_preparation` INT NOT NULL,
  `nb_personnes` INT NULL,
  `nom_recette` VARCHAR(50) NOT NULL,
  `image_recette` VARCHAR(255) NOT NULL,
  `instructions_recette` TEXT NOT NULL
)ENGINE = InnoDB DEFAULT CHARSET = latin1;