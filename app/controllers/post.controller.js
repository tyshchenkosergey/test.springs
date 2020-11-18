const Post = require('../models/post.model');

// CREATE
exports.create = (req, res) => {
  // Validate request
  if (!req.body.title) {
    return res.status(400).send({
      message: 'Please enter post title.',
    });
  } else if (!req.body.body) {
    return res.status(400).send({
      message: 'Please add post content.',
    });
  }
  //author info
  let author = {
    id: req.user._id,
  };
  // Create a post
  const post = new Post({
    author: author,
    title: req.body.title,
    body: req.body.body,
  });

  // Save post
  post
    .save()
    .then((newPost) => {
      res.send(newPost);
    })
    .catch((err) => {
      res.status(500).send({
        message: err.message || 'Some error occurred while creating the post.',
      });
    });
};

// INDEX
exports.getAll = (req, res) => {
  Post.find()
    .then((post) => {
      res.send(post);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving the post.',
      });
    });
};

// SHOW
exports.getById = (req, res) => {
  Post.findById(req.params.post_id)
    .then((post) => {
      if (post) {
        res.send(post);
      }
      return res.status(404).send({
        message: 'Post with id ' + req.params.post_id + ' does not exist',
      });
    })
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: 'Post with id ' + req.params.post_id + ' does not exist',
        });
      }
      return res.status(500).send({
        message:
          'Some error occurred while retrieving the post with post_id ' +
          req.params.post_id,
      });
    });
};

// UPDATE
exports.update = (req, res) => {
  // Validate request
  if (!req.body.title) {
    return res.status(400).send({
      message: 'Please enter post title.',
    });
  } else if (!req.body.body) {
    return res.status(400).send({
      message: 'Please add post content.',
    });
  }

  // Find post and update it
  Post.findByIdAndUpdate(
    req.params.post_id,
    {
      title: req.body.title,
      body: req.body.body,
    },
    { new: true }
  )
    .then((post) => {
      if (post) {
        res.send(post);
      }
      return res.status(404).send({
        message: 'Post with id ' + req.params.post_id + ' does not exist',
      });
    })
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: 'Post with id ' + req.params.post_id + ' does not exist',
        });
      }
      return res.status(500).send({
        message:
          'Some error occurred while updating the post with post_id' +
          req.params.post_id,
      });
    });
};

// DELETE
exports.delete = (req, res) => {
  Post.findByIdAndRemove(req.params.post_id)
    .then((post) => {
      if (post) {
        res.send({ message: 'Post has been deleted successfully!' });
      }
      return res.status(404).send({
        message: 'Post with id ' + req.params.post_id + ' does not exist',
      });
    })
    .catch((err) => {
      if (err.kind === 'ObjectId' || err.name === 'NotFound') {
        return res.status(404).send({
          message: 'Post with id ' + req.params.post_id + ' does not exist',
        });
      }
      return res.status(500).send({
        message:
          'Some error occurred while deleting the post with post_id' +
          req.params.post_id,
      });
    });
};
