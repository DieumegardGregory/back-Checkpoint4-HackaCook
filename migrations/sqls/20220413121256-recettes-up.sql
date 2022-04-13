CREATE TABLE IF EXISTS `recettes` (
  `id_recette` INT AUTO_INCREMENT PRIMARY KEY,
  `nom_recette` VARCHAR(50) NOT NULL,
  `image_recette` VARCHAR(255) NOT NULL,
  `instructions_recette` TEXT NOT NULL
)ENGINE = InnoDB DEFAULT CHARSET = latin1;