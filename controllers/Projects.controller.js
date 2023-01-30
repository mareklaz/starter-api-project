const Project = require('../models/Project.model');
const Collaboration = require('../models/Collaboration.model');

module.exports.createProject = (req, res, next) => {
  const { profiles } = req.body;

  // , creatorId: req.currentUser.id
  Project.create({ ...req.body, creatorId: req.currentUser })
    .then((project) => {
      console.log(project);

      profiles.forEach((profile) => {
        Collaboration.create({ projectId: project._id, collaboratorProfile: profile.profileName });
      });
      res.status(201).json(project);
    })
    .catch((error) => {
      console.log('Error al crear el PROYECTO', error);
      return res.status(404).json({
        msg: error,
      });
    });
};

module.exports.getAllProjects = (req, res, next) => {
  Project.find()
    .populate('creatorId')
    .then((projects) => {
      res.status(201).json(projects);
    })
    .catch((error) => {
      console.log('Error', error);
      res.status(404).json({
        msg: 'Error al buscar PROYECTO',
      });
    });
};

module.exports.getProjectDetail = (req, res, next) => {
  const { id } = req.params;
  Project.findById(id)
    .then((project) => {
      res.status(201).json(project);
    })
    .catch((error) => {
      console.log('Error', error);
      res.status(404).json({
        msg: 'Error al buscar PROYECTO',
      });
    });
};

module.exports.getProjectType = (req, res, next) => {
  const { type } = req.params;
  Project.find({ projectType: type })
    .then((projects) => {
      res.status(201).json(projects);
    })
    .catch((error) => {
      console.log('Error', error);
      res.status(404).json({
        msg: 'Error al buscar PROYECTO',
      });
    });
};

module.exports.updateProject = (req, res, next) => {
  const { id } = req.body;
  Project.findOne({ _id: id })
    .then((project) => {
      if (project) {
        console.log('El PROYECTO existe en la Base de Datos');
        project
          .updateOne(req.body, { new: true })
          .then((project) => res.status(201).json(project))
          .catch((error) => {
            console.log('Error al actualizare el PROYECTO', error);
            res.status(404).json({
              msg: error,
            });
          });
      } else {
        console.log('El PROYECTO no existe en la base de datos');
        return res.status(404).json({
          msg: 'El PROYECTO no existe en la base de datos',
        });
      }
    })
    .catch((error) => {
      console.log('Error', error);
      res.status(404).json({
        msg: 'Error al buscar PROYECTO',
      });
    });
};

module.exports.deleteProject = (req, res, next) => {
  const { id } = req.body;
  Project.findByIdAndDelete({ _id: id })
    .then((project) => {
      res.status(200).json({
        msg: 'El PROYECTO eliminado correctamente',
      });
    })
    .catch((error) => {
      console.log('Error', error);
      res.status(404).json({
        msg: 'Error al buscar PROYECTO a eliminar',
      });
    });
};
