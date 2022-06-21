const mongoose = require("mongoose");

// schéma de la sauce pour base de données
const sauceSchema = mongoose.Schema({
  userId: { type: String, required: true }, // l'identifiant unique de l'utilisateur qui a crée la sauce
  name: { type: String, required: true }, // le nom de la sauce
  manufacturer: { type: String, required: true }, // le fabricant de la sauce
  description: { type: String, required: true }, // la description de la sauce
  mainPepper: { type: String, required: true }, // le principal ingrédient épicé de la sauce
  imageUrl: { type: String, required: true }, // l'URL de l'image de la sauce téléchargée par l'utilisateur
  heat: { type: Number, required: true }, // nombre entre 1 et 10 décrivant la sauce
  likes: { type: Number }, // nombre d'utilisateurs qui aiment la sauce
  dislikes: { type: Number }, // nombres d'utilisateurs qui n'aiment pas la sauce
  usersLiked: { type: [String] }, // tableau des identifiants des utilisateurs qui ont aimé
  usersDisliked: { type: [String] }, // tableau des identifiants des utilisateurs qui n'ont pas aimé
});

module.exports = mongoose.model("Sauce", sauceSchema);