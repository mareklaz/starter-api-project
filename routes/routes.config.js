const router = require('express').Router();

const userController = require('../controllers/Users.controller');
const projectController = require('../controllers/Projects.controller');
const collaborationController = require('../controllers/Collaborators.controllers');

router.get('/', (req, res, next) => {
  res.json({ ok: true });
});

// USERS
router.post('/users', userController.createUser);
router.get('/users', userController.listUsers);
router.get('/users/:id', userController.detailUser);
router.put('/users/update', userController.updateUser);
router.delete('/users/delete', userController.deleteUser);

// PROJECTS
router.post('/projects', projectController.createProject);
router.get('/projects', projectController.listProjects);
router.get('/projects/:id', projectController.detailProject);
router.put('/projects/update', projectController.updateProject);
router.delete('/projects/delete', projectController.deleteProject);

// COLABORATION
router.post('/collaborations/add', collaborationController.addCollaborator);
router.delete('/collaborations/remove', collaborationController.removeCollaborator);
router.get('/collaborations', collaborationController.listCollaborations);
router.get('/collaborations/user', collaborationController.detailCollaborationByUser);
router.get('/collaborations/project', collaborationController.detailCollaborationByProject);

module.exports = router;
