const { check, validationResult } = require('express-validator');
const { showErrorResponse } = require('../utils/serverErrors');
exports.checkPost = [
  check('body')
    .notEmpty()
    .withMessage('Body is required'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty())
      return res.status(401).json({ errors: errors.array() });
    if (!req.file) {
      return showErrorResponse(res, 404, 'File is required');
    }
    next();
  },
];
