const express = require('express');
const router = express.Router();

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');

const stuffCtrl = require('../controllers/stuff');
const like = require('../controllers/like');

router.get('/sauces', auth, stuffCtrl.findAllSauces);
router.post('/sauces', auth, multer, stuffCtrl.createThing);
router.get('/sauces/:id', auth, stuffCtrl.findOneSauce);
router.put('/sauces/:id', auth, multer, stuffCtrl.modifyThing);
router.delete('/sauces/:id', auth, stuffCtrl.deleteThing);

router.put('/sauces/:id/like' , auth, like.likeDislike);

module.exports = router;