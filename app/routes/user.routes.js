const verify = require('../helpers/verification');
const { isProfileOwner } = require('../helpers/ownership');

module.exports = (app) => {
  const user = require('../controllers/user.controller');
  // Create a new post
  app.post('/user/register', user.register);

  //Get all posts
  app.post('/user/login', user.login);

  //Edit profile info
  app.put('/user/:user_id/edit', verify, isProfileOwner, user.profileEdit);
};
