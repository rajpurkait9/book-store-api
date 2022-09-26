const User = require('../model/auth');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const register = async (req, res) => {
  try {
    const { email, password, name } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashPassword = await bcrypt.hash(password, salt);

    const createUser = await User.create({
      name,
      email,
      password: hashPassword,
    });
    const token = jwt.sign(
      { userID: createUser._id, name: createUser.name },
      process.env.JWT_SECRET,
      { expiresIn: '100d' }
    );
    res.status(201).json({ user: { name: createUser.name }, token });
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      return res.status(400).send('please provide credentials');
    const user = await User.findOne({ email });
    console.log(user);
    if (!email)
      return res.status(404).send('user does not exits with this mail id');

    const comparePassword = await bcrypt.compare(password, user.password);
    if (comparePassword) {
      const token = jwt.sign(
        { userID: user._id, name: user.name },
        process.env.JWT_SECRET,
        { expiresIn: '100d' }
      );
      res.status(200).json({ msg: 'sucess', token });
    } else {
      res.status(400).json({ msg: 'failure' });
    }
  } catch (error) {
    res.status(500).json({ msg: error.message });
  }
};

module.exports = {
  register,
  login,
};
