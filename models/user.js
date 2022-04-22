const mongoose = require('mongoose');                                          // on demande d'utiliser mongoose
const uniqueValidator = require('mongoose-unique-validator');                  // on demande d'utiliser unique validator pour avoir verfifier si les email ou mdp sont unique

const userSchema = mongoose.Schema({                                     // on declare usershema puis on dit qu'un email sera de type string qu'il sera unique est sera obligatoire
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

userSchema.plugin(uniqueValidator);

module.exports = mongoose.model('User', userSchema);