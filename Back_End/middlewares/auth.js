const jwt = require('jsonwebtoken');

const auth = () => (req, res, next) => {
  const token = req.headers.authorization;
  if (!token) {
    return res
      .status(401)
      .json({ errors: [{ msg: 'No token, authorization denied' }] });
  }

  const tokenFormat = token.split('.')[1];
  if (!tokenFormat) {
    return res
      .status(401)
      .json({ errors: [{ msg: 'Wrong token format, authorization denied' }] });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded.id;
    next();
  } catch (err) {
    return res
      .status(401)
      .json({ errors: [{ msg: 'Invalid token, authorization denied' }] });
  }
};

module.exports = auth;
