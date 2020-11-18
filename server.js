const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

// Config
dotenv.config();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Connecting to the database
mongoose
  .connect(process.env.URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log('Successfully connected to the database');
  })
  .catch((err) => {
    console.log('Could not connect to the database', err);
    process.exit();
  });

// define a simple route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to our blog. Please, sign up or log in to continue',
  });
});

//import routes
require('./app/routes/post.routes')(app);
require('./app/routes/user.routes')(app);

// listen for requests
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('Server is listening on port ' + port);
});
