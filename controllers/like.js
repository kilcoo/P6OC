const User = require('../models/user');
const Thing =require('../models/Thing');

exports.likeDislike = (req, res, next) => {
  let like = req.body.like;
  let update
  Thing.userId(req.params.id).then((sauce) => {
    if (like === 1 && !sauce.usersLiked.includes(req.body.userId)) {
      update = {
        $inc: { likes: +1 },
        $push: {usersLiked: req.body.userId}
      }
    } else if (like === 0 && sauce.usersLiked.includes(req.body.userId)) {
      update = {
        $inc: { likes: -1 },
        $pull: {usersLiked: req.body.userId}
      }
    }
  })
}