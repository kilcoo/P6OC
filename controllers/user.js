const User = require('../models/user')                           // on demande d'utiliser le models dans user models
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');                                // on demande d'utiliser bcrypt pour crypter les donnees

exports.signup = (req, res, next) => {                          // un middleware pour pouvoir s'inscrire 
  bcrypt.hash(req.body.password, 10)                            // on demande de crypter les donnees
    .then(hash => {
      const user = new User({
        email: req.body.email,
        password: hash
      }); 
      user.save()                                                                   // on sauvegarde les infos
        .then(() => res.status(201).json({ message: 'Utilisateur créé !' }))        // si il a ete cree alors donne le code 201 pour dire que c'est bon
        .catch(error => res.status(400).json({ error }));                           // sinon erreur 400
    })
    .catch(error => res.status(500).json({error}));
    
};
exports.login = (req, res, next) => {                                           // un middleware pour pouvoir se connecter
  User.findOne({ email: req.body.email })                                        // on demande de trouver si un email correspond a ce qui est ecrit
    .then(user => {
      if (!user) {                                                              // si les info du user n'est pas trouver 
        return res.status(401).json({ error: 'Utilisateur non trouvé !' });     // il va nous donner une erreur 401 avec un message d'erreur
      }
      bcrypt.compare(req.body.password, user.password)                          // on compare les infos donner
        .then(valid => {
          if (!valid) {                                                         // si pas valid on enverra l'erreur 401
            return res.status(401).json({ error: 'Mot de passe incorrect !' });
          }                                                                     // sinon un code 200 pour dire que c'est bon
          res.status(200).json({                 
            userId: user._id,
            token: jwt.sign(
              { userId: user._id },
              'RANDOM_TOKEN_SECRET',
              { expiresIn: '24h' }
            )
          });
        })
        .catch(error => res.status(500).json({ error }));
    })
    .catch(error => res.status(500).json({ error }));
};