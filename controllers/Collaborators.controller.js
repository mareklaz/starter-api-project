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

module.exports.addCollaborator = (req, res, next) => {
  const { collaboratorId, projectId } = req.body;
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
