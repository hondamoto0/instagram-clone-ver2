const User = require('../models/User');
const bcrypt = require('bcrypt');
const showErrorResponse = require('../utils/serverErrors');
const { generateToken } = require('../utils/token');
exports.createUser = async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (user)
      return res
        .status(401)
        .json({ errors: [{ msg: 'Email is already exists !' }] });
    const hashPassword = await bcrypt.hash(password, 12);
    const newUser = User({
      username,
      email,
      password: hashPassword,
    });
    await newUser.save();
    const token = generateToken(newUser._id);
    return res.json({ token, user: { username, email, _id: newUser._id } });
  } catch (error) {
    return res.status(500).json({ errors: [{ msg: 'Server Error !' }] });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    // check Email is already
    const user = await User.findOne({ email });
    if (!user)
      return res.status(401).json({ errors: [{ msg: 'User not exists !' }] });
    // check password & hash password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(401).json({ errors: [{ msg: 'Wrong Password !' }] });
    const token = await generateToken(user._id);
    const { username, _id } = user;
    return res.json({ token, user: { _id, username, email } });
  } catch (error) {
    return showErrorResponse(res, 500);
  }
};
