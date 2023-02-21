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

  Collaboration.findById(collaborationId)
    .then((collaboration) => {
      if (collaboration.collaboratorId === req.currentUser || !collaboration.collaboratorId) {
        collaboration
          .update({ collaboratorId: req.currentUser }, { new: true })
          .then((colaborationUpdated) => res.status(201).json({ back: 'updated' }))
          .catch((error) => console.log('error'));
        return;
      } else if (collaboration.collaboratorId === req.currentUser) {
        console.log('Ya hay un colaborador');
        res.status(201).json({ back: 'alert' });
        return;
      } else {
        collaboration
          .update({ collaboratorId: null }, { new: true })
          .then((colaborationUpdated) => res.status(201).json({ back: 'null' }))
          .catch((error) => console.log('error'));
        return;
      }
    })
    .catch((error) => {
      res.status(404).json({
        msg: 'Error al buscar el Colaborador',
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
