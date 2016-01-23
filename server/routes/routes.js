var express = require('express');
var router = express.Router();
var userController = require('../controllers/users.js');
var qpoolController = require('../controllers/question-pools.js');

//API Endpoints
router.route('/users/register')
	.post(userController.createUser);

router.route('/users/login')
	.post(userController.authUser);

router.route('/users/index')
	.get(userController.getUser);

router.route('/users/update')
	.post(userController.updateUser);

router.route('/questions/pools/create')
	.post(qpoolController.createQPool);

router.route('/questions/pools/index')
	.get(qpoolController.getQPool);
	
module.exports = router;