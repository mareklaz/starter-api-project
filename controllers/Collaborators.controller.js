const Collaboration = require('../models/Collaboration.model');

module.exports.getProjectCollaborators = (req, res, next) => {
  const { projectId } = req.params;

  Collaboration.find({ projectId: projectId })
    .populate('collaboratorId')
    .populate('projectId')
    .then((collaborations) => {
      res.status(201).json(collaborations);
    })
    .catch((error) => {
      res.status(404).json({
        msg: error,
      });
    });
};

module.exports.collaborationUser = (req, res, next) => {
  const { collaborationId, projectId } = req.body;

  const marek = '63d8fd4a0be2bab6602c5649';

  Collaboration.findById(collaborationId)
    .then((collaboration) => {
      if (!collaboration.collaboratorId) {
        collaboration
          .update({ collaboratorId: marek }, { new: true })
          .then((colaborationUpdated) => res.status(201).json(colaborationUpdated))
          .catch((error) => console.log('error'));
      } else {
        collaboration
          .update({ collaboratorId: null }, { new: true })
          .then((colaborationUpdated) => res.status(201).json())
          .catch((error) => console.log('error'));
      }
      // Like.findOne({ userId: req.currentUser, projectId: project.id })
      //   .then((likes) => {
      //     if (!likes) {
      //       Like.create({ userId: req.currentUser, projectId: projectId })
      //         .then((like) => {
      //           res.status(200).json({ status: true });
      //         })
      //         .catch((error) => {
      //           res.status(200).json(error);
      //         });
      //     } else {
      //       likes.delete().then(res.status(200).json({ status: false }));
      //     }
      //   })
      //   .catch((error) => {
      //     res.status(404).json({
      //       msg: 'Error al buscar LIKES',
      //     });
      //   });
    })
    .catch((error) => {
      res.status(404).json({
        msg: 'Error al buscar el Colaborador',
      });
    });
};

module.exports.addCollaborator = (req, res, next) => {
  const { collaboratorId, projectId, profile } = req.body;
  Collaboration.findOne({ collaboratorId: collaboratorId, projectId: projectId })
    .then((collaboration) => {
      if (!collaboration) {
        Collaboration.create(req.body)
          .then((collaboration) => res.status(201).json(collaboration))
          .catch((error) => {
            console.log('Error al crear una COLABORACION', error);
            return res.status(404).json({
              msg: error,
            });
          });
      } else {
        console.log('La COLABORACION ya existe', error);
        return res.status(404).json({
          msg: error,
        });
      }
    })
    .catch((error) => {
      console.log('Error', error);
      res.status(404).json({
        msg: 'Ya existe la COLABORACION',
      });
    });
};

// module.exports.listCollaborations = (req, res, next) => {
//   // Collaboration.find()
//   //   .populate('collaboratorId')
//   //   .populate('projectId')
//   //   .then((collaboration) => {
//   //     res.status(201).json(collaboration);
//   //   })
//   //   .catch((error) => {
//   //     console.log('Error', error);
//   //     res.status(404).json({
//   //       msg: 'Error al buscar COLABORACIONES',
//   //     });
//   //   });
// };

module.exports.removeCollaborator = (req, res, next) => {
  const { collaboratorId, projectId } = req.body;
  Collaboration.findOne({ collaboratorId: collaboratorId, projectId: projectId })
    .then((collaboration) => {
      if (collaboration) {
        Collaboration.deleteOne(req.body)
          .then((collaboration) =>
            res.status(200).json({
              msg: 'Se eliminado la COLABORACION correctamente',
            })
          )
          .catch((error) => {
            console.log('Error al eliminado una COLABORACION', error);
            return res.status(404).json({
              msg: error,
            });
          });
      } else {
        console.log('La colaboración no EXISTE', error);
        return res.status(404).json({
          msg: error,
        });
      }
    })
    .catch((error) => {
      console.log('Error', error);
      res.status(404).json({
        msg: 'La colaboración no EXISTE',
      });
    });
};

module.exports.getProjectCollaborators = (req, res, next) => {
  console.log('getProjectCollaborators LLEGA', req.params);
  const { id } = req.params;
  Collaboration.find({ projectId: id })
    .populate('collaboratorId')
    .populate('projectId')
    .then((collaboration) => {
      res.status(200).json(collaboration);
    })
    .catch((error) => {
      console.log('Error', error);
      res.status(404).json({
        msg: 'Error al buscar COLABORACION por USUARIO',
      });
    });
};

module.exports.detailCollaborationByUser = (req, res, next) => {
  const { collaboratorId } = req.body;
  Collaboration.find({ collaboratorId: collaboratorId })
    .populate('collaboratorId')
    .populate('projectId')
    .then((collaboration) => {
      res.status(200).json(collaboration);
    })
    .catch((error) => {
      console.log('Error', error);
      res.status(404).json({
        msg: 'Error al buscar COLABORACION por PROYECTO',
      });
    });
};
