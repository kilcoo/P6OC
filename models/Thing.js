// on cree un shema a suivre pour les elements
const mongoose = require('mongoose');

const sauceSchema = mongoose.Schema({           // on utilise la fonctionnaliter .shema de mongoose
  name: { type: String, required: true },
  manufacturer: { type: String, required: true },
  description: { type: String, required: true },
  mainPepper: { type: String, required: true },
  imageUrl: { type: String, required: true },
  heat: {type: Number, required: true}
});

module.exports = mongoose.model('Thing', sauceSchema);