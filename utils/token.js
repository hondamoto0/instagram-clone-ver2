const jwt = require('jsonwebtoken');

exports.generateToken = userId => {
  const payload = {
    user: {
      _id: userId,
    },
  };
  return jwt.sign(payload, process.env.JWT_SECRETKEY);
};
