const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const sauceCtrl = require('../controllers/sauce');

router.get('/', auth, sauceCtrl.getAllSauce); // renvoie le tableau de toutes les sauces de la BdD /api/sauces
router.post('/', auth, multer, sauceCtrl.createSauce); // capture et enregistre les images... /api/sauces

router.get('/:id', auth, sauceCtrl.getOneSauce); // renvoie la sauce avec l'id fourni /api/sauces/:id
router.put('/:id', auth, multer, sauceCtrl.modifySauce); // met à jour la sauce avec l'id fourni

router.delete('/:id', auth, multer, sauceCtrl.deleteSauce); // supprime la sauce avec l'id fourni

router.post('/:id/like', auth, sauceCtrl.likeDislike); // définit le statut like pour l'userId fourni like =1 like=0 ou like=-1


module.exports = router;


/**
 * // importation express 
const express = require("express");

const SaucesControllers = require("../controllers/SaucesControllers");

//importation du controller 
const likeSaucesControllers = require("../controllers/likeDislike");

// importation multer 
const multer = require('../middleware/multer.config');
// fonction Router() 
const router = express.Router();

const auth = require('../middleware/authentification');

router.get('/', auth, SaucesControllers.list);

router.get('/:id', auth, SaucesControllers.show);

router.post('/', auth, multer, SaucesControllers.create);

router.put('/:id', auth, multer, SaucesControllers.update);

router.delete('/:id', auth, SaucesControllers.remove);

router.post("/:id/like", auth, likeSaucesControllers.likeDislike);

module.exports = router;
 */