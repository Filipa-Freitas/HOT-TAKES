const express = require('express');
const router = express.Router();
const sauceCtrl = require('../controllers/sauce');
const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const sauceValidation = require('../middleware/sauce-validation');

router.post('/', auth, multer, sauceValidation, sauceCtrl.createSauce);

router.put('/:id', auth, multer, sauceValidation, sauceCtrl.modifySauce);

router.delete('/:id', auth, sauceCtrl.deleteSauce);

router.get('/:id', auth, sauceCtrl.getOneSauce);

router.get('/', auth, sauceCtrl.getAllSauces);

router.post('/:id/like', auth, sauceCtrl.handleLikesAndDislikes);

module.exports = router;