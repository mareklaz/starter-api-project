const User = require('../models/User.model');
const jwt = require('jsonwebtoken');
const generateID = require('../helpers/generateID');
const { copy } = require('../routes/routes.config');
const { emailRegister } = require('../helpers/email');

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  console.log(password);
  User.findOne({ email }) // Buscamos al usuario en la DB (por el email).
    .then((user) => {
      // Confirmamos que el usuario existe.
      if (!user) {
        const error = new Error('El usuario no existe');
        res.status(404).json({ msg: error.message });
      }
      // Confirmamos si el usuario ha activado su cuenta.
      if (!user.active) {
        const error = new Error('Tu cuenta no ha sido confirmada');
        res.status(403).json({ msg: error.message });
      }
      // Confirmamos si la contraseña del usuario es correcta o no.
      user.checkPassword(password).then((result) => {
        if (!result) {
          next(res.status(403).json({ msg: 'Email o contraseña incorrecta' })); // Contraseña incorrecta.
        } else {
          const token = jwt.sign(
            {
              id: user.id,
            },
            process.env.JWT_SECRET,
            {
              expiresIn: '1h',
            }
          ); // Firmar y enviar el token jwt.
          res.status(200).json({ accessToken: token });
        }
      });
    })
    .catch((error) => {
      console.log('Error en la busqueda del usuario', error.message);
      res.status(404).json(error);
    });
};

module.exports.validate = (req, res, next) => {
  const { token } = req.params;

  User.findOne({ token: token }) // Buscamos el token
    .then((user) => {
      if (user) {
        console.log('Token Correcto');
        // Buscamos al usuario y lo activamos, además eliminamos el token que tenía.
        user
          .updateOne({ active: true, token: '' }, { new: true })
          .then((user) => {
            console.log('Usuario activado', user);
            res.status(200).json({ msg: 'Usuario activado correctamente' });
          })
          .catch(() => {
            // const error = new Error('Token no valido');
            res.status(403).json({ msg: 'Token no valido' });
          });
      } else {
        console.log('Token Incorrecto');
        const error = new Error('Token incorrecto');
        res.status(403).json({ msg: error.message });
      }
    })
    .catch((error) => {
      console.log('Error al buscar Token', error);
    });
};

module.exports.restorePassword = (req, res, next) => {
  const { email } = req.body;
  console.log(email);
  User.findOne({ email }) // Buscamos al usuario en la DB (por el email)
    .then((user) => {
      // Usuario Existe
      if (user) {
        user // Desactivamos el usuario y generamos un nuevo Token de activación
          .updateOne({ active: false, token: generateID() }, { new: true })
          .then(() => {
            res.status(200).json({ msg: 'Se ha enviado un email de activación' });
          })
          .catch(() => {
            const error = new Error('No se ha podido generar la activación de la cuenta');
            res.status(403).json({ msg: error.message });
          });
      } else {
        res.status(404).json({ msg: 'Usuario no encontrado' });
      }
    })
    .catch((error) => {
      res.status(404).json(error);
    });
};

module.exports.checkToken = (req, res, next) => {
  const { token } = req.params;

  User.findOne({ token: token }) // Buscamos el token
    .then((token) => {
      if (token) {
        res.status(200).json({ msg: 'Token válido' });
      } else {
        const error = new Error('Token no válido');
        res.status(403).json({ msg: error.message });
      }
    })
    .catch((error) => {
      console.log('Error al buscar Token', error);
    });
};

module.exports.newPassword = (req, res, next) => {
  const { token } = req.params;
  const { password } = req.body;

  console.log(token);
  console.log(password);

  User.findOne({ token: token }) // Buscamos el token
    .then((user) => {
      if (user) {
        // Seteamos la constraseña proporcionada y la guardamos
        user.password = password;
        user.save();
        // Actualizamos el token como string vacio
        user
          .updateOne({ token: '' }, { new: true })
          .then(() => {
            res.status(200).json({ msg: 'La contraseña se ha cambiado correctamente' });
          })
          .catch(() => {
            const error = new Error('No se ha podido cambiar la contraseña correctamente');
            res.status(403).json({ msg: error.message });
          });
      } else {
        const error = new Error('Token no válido');
        res.status(403).json({ msg: error.message });
      }
    })
    .catch((error) => {
      console.log('Error al buscar Token', error);
    });
};
