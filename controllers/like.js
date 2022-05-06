const thing = require('../models/Thing');

exports.likeDislike = (req, res, next) => {
  console.log("resultat" + req.body);
  let like = req.body.like;
  let update ;
  thing.userId(req.params.id).then((sauce) => {
    if (like === 1 && !sauce.usersLiked.includes(req.body.userId)) {
      thing.like({ _id: req.params.id });
      like + 1;
    }
  });
};



