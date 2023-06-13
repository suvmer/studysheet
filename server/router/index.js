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
router.post('/schedule/delete', authMiddleWare, TableController.deleteTable);
router.post('/schedule/get', authMiddleWare, TableController.getTable);
router.post('/schedule/getfrom', authMiddleWare, TableController.getTables);
router.post('/schedule/my', authMiddleWare, TableController.getMyTables);


module.exports = router;