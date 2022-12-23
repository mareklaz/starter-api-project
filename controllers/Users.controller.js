const User = require('../models/User.model');

module.exports.createUser = (req, res, next) => {
  console.log('REQ.BODY', req.body);
  if (req.file) {
    req.body.image = req.file.path;
  }
  const { email } = req.body;
  console.log('REQ.BODY', req.body);
  User.findOne({ email: email })
    .then((user) => {
      if (!user) {
        console.log('El USUARIO no existe en la Base de Datos');
        User.create(req.body)
          .then((user) => res.status(201).json(user))
          .catch((error) => {
            console.log('Error al crear el usuario', error);
            return res.status(404).json({
              msg: error,
            });
          });
      } else {
        console.log('El USUARIO ya existe en la base de datos');
        return res.status(404).json({
          msg: 'El USUARIO ya existe en la base de datos',
        });
      }
    })
    .catch((error) => {
      console.log('Error', error);
      res.status(404).json({
        msg: 'Error al buscar USUARIO',
      });
    });
};

module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.currentUser)
    .then((user) => {
      if (!user) {
        console.log('No se ha encontrado al USUARIO');
        return res.status(404).json({
          msg: 'No se ha encontrado al USUARIO',
        });
      } else {
        res.json(user);
      }
    })
    .catch(next);
};

module.exports.listUsers = (req, res, next) => {
  User.find()
    .then((users) => {
      res.status(201).json(users);
    })
    .catch((error) => {
      console.log('Error', error);
      res.status(404).json({
        msg: 'Error al buscar USUARIOS',
      });
    });
};

module.exports.detailUser = (req, res, next) => {
  const { id } = req.params;
  User.findById(id)
    .then((user) => {
      res.status(201).json(user);
    })
    .catch((error) => {
      console.log('Error', error);
      res.status(404).json({
        msg: 'Error al buscar USUARIO',
      });
    });
};

module.exports.updateUser = (req, res, next) => {
  const { email } = req.body;
  User.findOne({ email: email })
    .then((user) => {
      if (user) {
        console.log('El USUARIO existe en la Base de Datos');
        user
          .updateOne(req.body, { new: true })
          .then((user) => res.status(201).json(user))
          .catch((error) => {
            console.log('Error al actualizare el USUARIO', error);
            res.status(404).json({
              msg: error,
            });
          });
      } else {
        console.log('El USUARIO no existe en la base de datos');
        return res.status(404).json({
          msg: 'El USUARIO no existe en la base de datos',
        });
      }
    })
    .catch((error) => {
      console.log('Error', error);
      res.status(404).json({
        msg: 'Error al buscar USUARIO',
      });
    });
};

module.exports.deleteUser = (req, res, next) => {
  const { id } = req.body;
  User.findByIdAndDelete({ _id: id })
    .then((user) => {
      res.status(200).json({
        msg: 'El USUARIO eliminado correctamente',
      });
    })
    .catch((error) => {
      console.log('Error', error);
      res.status(404).json({
        msg: 'Error al buscar USUARIO a eliminar',
      });
    });
};
