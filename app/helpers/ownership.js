const Post = require('../models/post.model');

exports.isProfileOwner = (req, res, next) => {
  if (req.user._id == req.params.user_id) {
    next();
  } else {
    res.status(401).send({
      message: "This profile doesn't belong to you. Please, re-log in",
    });
  }
};

exports.isPostOwner = (req, res, next) => {
  Post.findById(req.params.post_id)
    .then((post) => {
      if (post.author.id.equals(req.user._id)) next();
      else
        return res.status(401).send({
          message: 'Nope',
        });
    })
    .catch((err) => {
      return res.status(401).send({
        message: 'Wrong user. Please, re-log in',
      });
    });
};
