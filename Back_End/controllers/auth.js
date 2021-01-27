const User = require('../models/User');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const CustomError = require('../errors/customError');

exports.signUp = async (req, res) => {
  try {
    const { name, email } = req.body;
    let { password } = req.body;

    const exists = await User.findOne({ email });

    if (exists) {
      throw new CustomError(403, 'User already exists');
    }

    const salt = await bcrypt.genSalt(10);
    password = await bcrypt.hash(password, salt);

    const user = await User.create({ name, email, password });

    const payload = { id: user._id };
    const jwtSecret = process.env.JWT_SECRET;
    const token = jwt.sign(payload, jwtSecret, { expiresIn: 360000 });

    user.password = undefined;

    return res.status(201).json({ user, token });
  } catch (e) {
    const code = e.errorCode || 500;
    console.log(e);
    return res.status(code).json({ errors: [{ msg: e.message }] });
  }
};

exports.logIn = async (req, res) => {
  try {
    console.log(req.body);
    const { email, password } = req.body;

    let user = await User.findOne({ email });
    if (!user) {
      throw new CustomError(404, 'User does not exists');
    }

    const credentialsMatch = await bcrypt.compare(password, user.password);
    if (!credentialsMatch) {
      throw new CustomError(401, 'Invalid credentials');
    }

    const payload = { id: user.id };
    const jwtSecret = process.env.JWT_SECRET;
    const token = jwt.sign(payload, jwtSecret, { expiresIn: 360000 });

    user.password = undefined;

    return res.status(200).json({ user, token });
  } catch (e) {
    const code = e.errorCode || 500;
    console.log(e);
    return res.status(code).json({ errors: [{ msg: e.message }] });
  }
};

exports.logOut = async (req, res) => {
  // try {
  //   return res.clearCookie('access_token').json({msg: "You Logged Out successfully"}).status(200)
  // } catch (err) {
  //   const errorCode = err.errorCode || 500;
  //   return res.status(errorCode).json({ errors: [{ msg: err.message }] });
  // }
};
