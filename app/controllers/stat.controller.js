const Post = require('../models/post.model');
const { countPosts } = require('../helpers/dailyStat');

exports.showDailyStat = (req, res) => {
  Post.find()
    .then((post) => {
      const dates = post
        .sort(function (a, b) {
          return a.dateAdded - b.dateAdded;
        })
        .map((el) => el.dateAdded.toString().slice(4, 15));
      res.send(countPosts(dates));
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while retrieving statistics',
      });
    });
};
