const Router = require('express');
const UserController = require('../controllers/user-controller')
const router = new Router();
const authMiddleWare = require('../middlewares/auth-middleware');

router.post('/registration', UserController.registration);
router.post('/login', UserController.login);
router.post('/logout', UserController.logout);
router.get('/activate/:link', UserController.activate);
router.post('/refresh', UserController.refresh);
router.get('/users', authMiddleWare, UserController.getUsers);
router.post('/getcity', UserController.getCity);
router.get('/getcity', UserController.getCity);


module.exports = router;