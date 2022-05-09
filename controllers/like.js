const thing = require('../models/Thing');

exports.likeDislike = (req, res, next) => {
  let like = req.body.like;
  let update;
  thing.findById(req.params.id)
    .then((sauce) => {
      if (like === 1 && !sauce.usersLiked.includes(req.body.userId)) {
        update = {
          $inc: { likes: 1 },
          $push: { usersLiked: req.body.userId },
        };
      } else if (
        like === -1 &&
        !sauce.usersDisliked.includes(req.body.userId)
      ) {
        update = {
          $inc: { dislikes: 1 },
          $push: { usersDisliked: req.body.userId },
        };
      } else if (like === 0 && sauce.usersLiked.includes(req.body.userId)) {
        update = {
          $inc: { likes: -1 },
          $pull: { usersLiked: req.body.userId },
        };
      } else if (like === 0 && sauce.usersDisliked.includes(req.body.userId)) {
        update = {
          $inc: { dislikes: -1 },
          $pull: { usersDisliked: req.body.userId },
        };
      }

      thing.updateOne({ _id: req.params.id }, { ...update })
        .then(() => res.status(200).json({ message: "sucess" }))
        .catch((error) => res.status(500).json({ error }));
    })
    .catch((error) => res.status(500).json({ error }));
};





