const User = require('../models/User.model');
const jwt = require('jsonwebtoken');

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    next(res.status(403).json({ msg: 'Credenciales inválidas' }));
  } else {
    User.findOne({ email }).then((user) => {
      if (!user) {
        next(res.status(403).json({ msg: 'Credenciales inválidas' }));
      } else {
        user.checkPassword(password).then((result) => {
          if (!result) {
            next(res.status(403).json({ msg: 'Credenciales inválidas' }));
          } else {
            const token = jwt.sign(
              {
                id: user.id,
              },
              process.env.JWT_SECRET,
              {
                expiresIn: '7d',
              }
            );
            res.json({ accessToken: token });
          }
        });
      }
    });
  }
};
