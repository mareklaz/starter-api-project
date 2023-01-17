const Likes = require('../models/Like.model');
const Project = require('../models/Project.model');

module.exports.addLike = (req, res, next) => {
  const { userId, projectId } = req.body;

  Project.findById(projectId)
    .then((project) => {
      Likes.findOne({ userId: userId, projectId: project.id })
        .then((likes) => {
          if (!likes) {
            Likes.create(req.body)
              .then((like) => {
                res.status(200).json({ like });
              })
              .catch((error) => {
                console.log('Error', error);
                res.status(404).json({
                  msg: 'Error al crear LIKE',
                });
              });
          } else {
            res.status(404).json({
              msg: 'El LIKE ya existe',
            });
          }
        })
        .catch((error) => {
          console.log('Error', error);
          res.status(404).json({
            msg: 'Error al buscar LIKES',
          });
        });
    })
    .catch((error) => {
      console.log('Error', error);
      res.status(404).json({
        msg: 'El PROYECTO no existe',
      });
    });
};

module.exports.removeLike = (req, res, next) => {
  const { userId, projectId } = req.body;
  Project.findById(projectId)
    .then((project) => {
      console.log('PROJECT encontrado', project);
      Likes.findOneAndDelete({ userId: userId, projectId: project.id })
        .then(() => {
          res.status(200).json({ msg: 'Like eliminado correctamente' });
        })
        .catch((error) => {
          console.log(error);
          res.status(404).json({ msg: 'Fallo al eliminar el like' });
        });
    })
    .catch((error) => {
      console.log('Error', error);
      res.status(404).json({
        msg: 'El PROYECTO no existe',
      });
    });
};

module.exports.getProjectsLikes = (req, res, next) => {
  const { id } = req.params;

  Likes.find({ projectId: id })
    .then((likes) => {
      res.status(200).json(likes);
    })
    .catch((error) => {
      console.log(error);
      res.status(200).json({ msg: 'Fallo al buscar el like' });
    });
};
