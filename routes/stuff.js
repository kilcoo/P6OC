const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const stuffCtrl = require('../controllers/stuff');
const like = require('../controllers/like');

router.get('/sauces', auth, stuffCtrl.findAllSauces);  // methode get pour lire
router.post('/sauces', auth, multer, stuffCtrl.createThing);  // methode post permet de cree
router.get('/sauces/:id', auth, stuffCtrl.findOneSauce); // permet de trouver et lire une sauce
router.put('/sauces/:id', auth, multer, stuffCtrl.modifyThing); //permet de modifier la sauce
router.delete('/sauces/:id', auth, stuffCtrl.deleteThing); //permet de supprimer une sauce

router.post('/sauces/:id/like' , auth, like.likeDislike); // permet de cree un like

module.exports = router;