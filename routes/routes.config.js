const router = require('express').Router();

const authController = require('../controllers/Auth.controller');
const userController = require('../controllers/Users.controller');
const projectController = require('../controllers/Projects.controller');
const collaborationController = require('../controllers/Collaborators.controllers');
const authMiddleware = require('../middleware/auth.middleware');
const fileUploader = require('../config/cloudinary.config');

router.get('/', (req, res, next) => {
  res.json({ ok: true });
});

// AUTH
router.post('/login', authController.login);
router.get('/validation/:token', authController.validate);
router.post('/restore-password', authController.restorePassword);
router.get('/restore-password/:token', authController.checkToken);
router.post('/restore-password/:token', authController.newPassword);
router.post('/login', authController.login);

// USERS
router.post('/register', fileUploader.single('image'), userController.createUser);
router.get('/users/me', authMiddleware.isAuthenticated, userController.getCurrentUser);
router.get('/users', userController.listUsers);
router.get('/users/:id', userController.detailUser);
router.put('/users/update', userController.updateUser);
router.delete('/users/delete', userController.deleteUser);

// PROJECTS
router.post('/projects', fileUploader.single('image'), projectController.createProject);
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
