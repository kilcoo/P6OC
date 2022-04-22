const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
  try {
    const token = req.headers.authorization.split(' ')[1];                      // on recupere le token dans le header sa retournera un tableau
    const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');              // on decode le token puis on verifie le token avec jwt
    const userId = decodedToken.userId;                                         // on recupere le userid qu'il y a dans la clee
    if (req.body.userId && req.body.userId !== userId) {                        // on verifie si il correspond a celui qu'il y a dans le token
      throw 'Invalid user ID';                                                  // si pas valide on enverra un invalid user id
    } else {
      next();                                                                   // sinon on ira au prochain middleware
    }
  } catch {                                   // si y'a error
    res.status(401).json({
      error: new Error('Invalid request!')
    });
  }
};