const Sauce = require('../models/sauce');
const fs = require('fs'); 

// pour afficher toutes les sauces
exports.getAllSauce = (req, res, next) => {
    Sauce.find()
      .then(
      (sauces) => {
        res.status(200).json(sauces);
      }
    )
      .catch(
      (error) => {
        res.status(400).json({
          error: error
        });
      }
    );
  };

  //pour créer une sauce enregistre l'image mais pas la sauce
  exports.createSauce = (req, res, next) => {
    const sauceObject = JSON.parse(req.body.sauce);
    delete sauceObject._id;
    const sauce = new Sauce({
      ...sauceObject,
      imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
    });
    sauce.save()
      .then(() => res.status(201).json({ message: 'sauce enregistrée !'}))
      .catch(error => res.status(400).json({ error}));
  };

  //pour afficher une sauce
  exports.getOneSauce = (req, res, next) => {
    Sauce.findOne({
      _id: req.params.id
    }).then(
      (sauce) => {
        res.status(200).json(sauce);
      }
    ).catch(
      (error) => {
        res.status(404).json({
          error: error
        });
      }
    );
  };
  //pour modifier la sauce
  exports.modifySauce = (req, res, next) => {
    const sauceObject = req.file ?
      {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get('host')}/images/${req.file.filename}`
      } : { ...req.body };
    Sauce.updateOne({ _id: req.params.id }, { ...sauceObject, _id: req.params.id })
      .then(() => res.status(200).json({ message: 'Objet modifié !'}))
      .catch(error => res.status(400).json({ error }));
  };

  //pour supprimer une sauce
  exports.deleteSauce = (req, res, next) => {
    Sauce.findOne({ _id: req.params.id })
      .then(sauce => {
        const filename = sauce.imageUrl.split('/images/')[1];
        fs.unlink(`images/${filename}`, () => {
          Sauce.deleteOne({ _id: req.params.id })
            .then(() => res.status(200).json({ message: 'Objet supprimé !'}))
            .catch(error => res.status(400).json({ error }));
        });
      })
      .catch(error => res.status(500).json({ error }));
  };

  //like dislike une sauce
  exports.likeDislike =(req, res,next) => {
    console.log(req);
    console.log(res);
    const id = req.params.id;
    if (req.body.like === 1) {
        Sauce.updateOne(
            { _id: req.params.id },
            {
                $inc: { likes: req.body.like++ },
                $push: { usersLiked: req.body.userId }
            })

            .then(() => res.status(200).json({ message: '+1 like !' }))
            .catch(error => res.status(400).json({ error }))

    } else if (req.body.like === -1) {
        Sauce.updateOne(
            { _id: req.params.id },
            {
                $inc: { dislikes: (req.body.like++) * -1 },
                $push: { usersDisliked: req.body.userId }
            })

            .then(() => res.status(200).json({ message: '+1 dislike !' }))
            .catch(error => res.status(400).json({ error }))

    } else {
        Sauce.findOne({ _id: req.params.id })
            .then(sauce => {
                if (sauce.usersLiked.includes(req.body.userId)) {
                    Sauce.updateOne({ _id: req.params.id },
                        {
                            $pull: { usersLiked: req.body.userId },
                            $inc: { likes: -1 }
                        })

                        .then(() => res.status(200).json({ message: 'like -1 !' }))
                        .catch(error => res.status(400).json({ error }))

                } else if (sauce.usersDisliked.includes(req.body.userId)) {
                    Sauce.updateOne({ _id: req.params.id },
                        {
                            $pull: { usersDisliked: req.body.userId },
                            $inc: { dislikes: -1 }
                        })
                        .then(() => res.status(200).json({ message: 'Dislike -1 !' }))
                        .catch(error => res.status(400).json({ error }))
                }
            })
            .catch(error => res.status(400).json({ error }))
    }
}

