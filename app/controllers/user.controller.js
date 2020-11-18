const User = require('../models/user.model');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { regValidation, logValidation } = require('../helpers/validation');

//REGISTRATION
exports.register = async (req, res) => {
  //validation
  const { error } = regValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //check if email is used
  const emailsIsUsed = await User.findOne({ email: req.body.email });
  if (emailsIsUsed) return res.status(400).send('Email already in use');

  //hash passwords
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(req.body.password, salt);

  //create new user
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: hash,
  });
  user
    .save()
    .then((user) => {
      res.send(user.username + ' user has been created');
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || 'Some error occurred while regestring new user.',
      });
    });
};
//LOGIN
exports.login = async (req, res) => {
  //validation
  const { error } = logValidation(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //check if email is used
  const user = await User.findOne({ email: req.body.email });
  if (!user) return res.status(400).send(`Email doesn't exist`);

  //check password
  const correctPassword = await bcrypt.compare(
    req.body.password,
    user.password
  );
  if (!correctPassword) return res.status(400).send('Wrong password');

  //JW-Token creation
  const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET);
  res.header('user-token', token).send(token);
};

//EDIT PROFILE
exports.profileEdit = (req, res) => {
  User.findByIdAndUpdate(req.params.user_id, {
    username: req.body.username,
    email: req.body.email,
    password: req.body.password,
    phone: req.body.phone,
    linkedIn: req.body.linkedIn,
    zip_code: req.body.zip_code,
  })
    .then((user) => {
      if (user) {
        res.send(user);
      }
      return res.status(404).send({
        message: 'User with id ' + req.params.user_id + ' does not exist',
      });
    })
    .catch((err) => {
      if (err.kind === 'ObjectId') {
        return res.status(404).send({
          message: 'User with id ' + req.params.user_id + ' does not exist',
        });
      }
      return res.status(500).send({
        message:
          'Some error occurred while updating user profile with user_id' +
          req.params.user_id,
      });
    });
};
