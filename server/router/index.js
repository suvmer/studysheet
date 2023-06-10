const Router = require('express');
const UserController = require('../controllers/user-controller')
const TableController = require('../controllers/table-controller')
const router = new Router();
const authMiddleWare = require('../middlewares/auth-middleware');
const trimMiddleware = require('../middlewares/trim-middleware');

router.post('/registration', UserController.registration);
router.post('/login', UserController.login);
router.post('/logout', UserController.logout);
router.get('/activate/:link', UserController.activate);
router.get('/refresh', UserController.refresh);
router.get('/users', authMiddleWare, UserController.getUsers);
router.post('/getcity', UserController.getCity);
router.get('/getcity', UserController.getCity);
router.post('/schedule/public/:tableid', TableController.getPublicTable);
router.post('/schedule/add', authMiddleWare, TableController.addTable);
router.post('/schedule/get/:tableid', authMiddleWare, TableController.getTable);
router.post('/schedule/getfrom/:userid', authMiddleWare, TableController.getTables);


module.exports = router;