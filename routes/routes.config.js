const router = require('express').Router();

const authController = require('../controllers/Auth.controller');
const userController = require('../controllers/Users.controller');
const projectController = require('../controllers/Projects.controller');
const collaborationController = require('../controllers/Collaborators.controller');
const likeController = require('../controllers/Likes.controller');
const authMiddleware = require('../middleware/auth.middleware');
const fileUploader = require('../config/cloudinary.config');

router.get('/', (req, res, next) => {
  res.json({ ok: true });
});

// AUTH
router.post('/login', authController.login);

// USERS
router.post('/register', userController.createUser);
router.get('/users/me', authMiddleware.isAuthenticated, userController.getCurrentUser);
router.get('/users', authMiddleware.isAuthenticated, userController.getAllUsers);
router.get('/users/:id', authMiddleware.isAuthenticated, userController.getUserDetail);
router.put('/users/update', authMiddleware.isAuthenticated, userController.updateUser);
router.delete('/users/delete', authMiddleware.isAuthenticated, userController.deleteUser);

// PROJECTS
router.post('/projects', authMiddleware.isAuthenticated, fileUploader.single('image'), projectController.createProject);
router.get('/projects', authMiddleware.isAuthenticated, projectController.getAllProjects);
router.get('/projects/:id', authMiddleware.isAuthenticated, projectController.getProjectDetail);
router.get('/projects/type/:type', authMiddleware.isAuthenticated, projectController.getProjectType);
router.put('/projects/update', authMiddleware.isAuthenticated, projectController.updateProject);
router.delete('/projects/delete', authMiddleware.isAuthenticated, projectController.deleteProject);

// COLABORATION
router.post('/collaborations/add', collaborationController.addCollaborator);
router.get('/collaborations/project/:id', collaborationController.getProjectCollaborators);
// router.get('/collaborations', collaborationController.listCollaborations);
router.delete('/collaborations/remove', collaborationController.removeCollaborator);
router.get('/collaborations/user', collaborationController.detailCollaborationByUser);

// LIKES
router.post('/likes/add', likeController.addLike);
router.post('/likes/remove', likeController.removeLike);
router.get('/likes/:id', likeController.getProjectsLikes);

module.exports = router;
