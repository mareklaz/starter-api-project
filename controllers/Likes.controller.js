const Like = require('../models/Like.model');
const Project = require('../models/Project.model');

module.exports.like = (req, res, next) => {
  const { userId, projectId } = req.body;

  Project.findById(projectId)
    .then((project) => {
      Like.findOne({ userId: req.currentUser, projectId: project.id })
        .then((likes) => {
          if (!likes) {
            Like.create({ userId: req.currentUser, projectId: projectId })
              .then((like) => {
                res.status(200).json({ status: true });
              })
              .catch((error) => {
                res.status(200).json(error);
              });
          } else {
            likes.delete().then(res.status(200).json({ status: false }));
          }
        })
        .catch((error) => {
          res.status(404).json({
            msg: 'Error al buscar LIKES',
          });
        });
    })
    .catch((error) => {
      res.status(404).json({
        msg: 'El PROYECTO no existe',
      });
    });
};

module.exports.getCurrentUserLikesInProject = (req, res, next) => {
  const { id } = req.params;

  Like.findOne({ userId: req.currentUser, projectId: id })
    .then((like) => {
      if (like) {
        res.status(200).json(like);
      } else {
        res.status(404).json({ msg: 'No se ha encontrado Like' });
      }
    })
    .catch((error) => {
      res.status(404).json({ msg: 'No se ha encontrado Like' });
    });
};

module.exports.getProjectLikes = (req, res, next) => {
  const { id } = req.params;

  Like.find({ projectId: id })
    .then((like) => {
      if (like) {
        res.status(200).json(like);
      } else {
        res.status(404).json({ msg: 'No se ha encontrado Like' });
      }
    })
    .catch((error) => {
      res.status(404).json({ msg: 'No se ha encontrado Like' });
    });
};
