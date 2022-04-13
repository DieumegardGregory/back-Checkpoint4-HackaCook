ALTER TABLE `favoris`
ADD CONSTRAINT `fk_favoris_users`
  FOREIGN KEY (`user_id`)
  REFERENCES `users` (`id_user`) 
  ON DELETE CASCADE
  ON UPDATE NO ACTION;

ALTER TABLE `favoris`
ADD CONSTRAINT `fk_favoris_recettes`
  FOREIGN KEY (`recette_id`)
  REFERENCES `recettes` (`id_recette`) 
  ON DELETE CASCADE
  ON UPDATE NO ACTION;
