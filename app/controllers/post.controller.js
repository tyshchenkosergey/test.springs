const Post = require('../models/post.model');

// CREATE
exports.create = async (req, res) => {
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
  //is title used?
  const titleIsUsed = await Post.findOne({ title: req.body.title });
  if (titleIsUsed) return res.status(400).send('Title is already in use');

  //author info
  let author = {
    id: req.user._id,
  };
  // Create a post
  req.body.body = req.sanitize(req.body.body);
  const post = new Post({
    author: author,
    title: req.body.title,
    body: req.body.body,
    dateAdded: Date.parse(req.body.dateAdded),
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

// INDEX WITH PAGINATION
exports.list = (req, res) => {
  Post.find()
    .skip(req.params.pageNum * 2)
    .limit(2)
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
  req.body.body = req.sanitize(req.body.body);
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

//SEARCH
exports.search = (req, res) => {
  let regex = new RegExp(req.params.search_text, 'i');
  Post.find({ $or: [{ title: regex }, { body: regex }] })
    .then((post) => {
      res.send(post);
    })
    .catch((err) => {
      return res.status(404).send({
        message: `Post with ${req.body.search_text} have not been found`,
      });
    });
};
