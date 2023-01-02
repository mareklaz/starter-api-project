const jwt = require('jsonwebtoken');
const User = require('../models/User.model');
const JWT_SECRET = process.env.JWT_SECRET;

// Revisar si el usuario esta autenticado
module.exports.isAuthenticated = (req, res, next) => {
  const authorization = req.headers.authorization.startsWith('Bearer');

  if (authorization) {
    const token = req.headers.authorization.split(' ')[1];
    // console.log(token);
    if (token) {
      jwt.verify(token, JWT_SECRET, (error, decodedToken) => {
        if (error) {
          console.log('Error', error);
          res.status(401).json({ msg: 'Se ha producido un error al verificar el token' });
          next();
        } else {
          console.log(decodedToken);
          User.findById(decodedToken.id).then((user) => {
            req.currentUser = user;
            console.log('Desde AUTH Middleware', req.currentUser);
            next();
          });
        }
      });
    } else {
      console.log('Se ha producido un error al verificar la autenticación');
      res.status(401).json({
        msg: 'Se ha producido un error al verificar la autenticación',
      });
    }
  } else {
    console.log('No esta autorizado');
    res.status(401).json({ msg: 'No esta autorizado' });
  }
};
