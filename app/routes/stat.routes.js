module.exports = (app) => {
  const stat = require('../controllers/stat.controller');

  //daily post statistic
  app.get('/stat', stat.showDailyStat);
};
