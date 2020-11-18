const { isProfileOwner, isPostOwner } = require('../helpers/ownership');
const verify = require('../helpers/verification');

module.exports = (app) => {
  const posts = require('../controllers/post.controller');

  // Create a new post
  app.post('/posts', verify, posts.create);

  // Get all posts with pagination of 10 posts per page
  app.get('/posts/list/:pageNum([0-9])', posts.list);

  // Get a single post
  app.get('/posts/:post_id', posts.getById);

  // Update a single post
  app.put('/posts/:post_id', verify, isPostOwner, posts.update);

  // Delete a single post
  app.delete('/posts/:post_id', verify, isPostOwner, posts.delete);

  //Search by post name or body
  app.get('/posts/search/:search_text', posts.search);
};
