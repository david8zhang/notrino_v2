var express = require('express');
var router = express.Router();
var userController = require('../controllers/usersController.js');
var questionController = require('../controllers/questionsController.js');
var authController = require('../controllers/authController.js');

/* -------------------- USER API ROUTES --------------------*/
// Register a user
// args: username, password, email
router.route('/users/register')
	.post(userController.createUser);

// Login a user
// args: username, password
router.route('/users/login')
	.post(userController.authUser);

// Index all users
router.route('/users/profile')
	.get(authController.authToken, userController.getUser);

// Tokenize a user
// args: user_id, reg_token
router.route('/users/tokenize')
	.post(authController.authToken, userController.tokenizeUser);

// test a user
// args: secret_code
router.route('/users/test_user')
	.post(userController.testUser);

// delete a user
// args: user_id
router.route('/users/delete')
	.post(userController.deleteUser);

/* -------------------- QUESTION API ROUTES -------------------- */
// create a question for testing purposes.
// args: secret_code
router.route('/questions/single/test_question')
	.post(questionController.createTestQuestion);

// create a single question
// args: question_id, text, tag, choices, answer, user_id
router.route('/questions/single/create')
	.post(questionController.createQuestion);

// Return a single question based on question_id
router.route('/questions/single/index')
	.get(questionController.getQuestion);

// Return all questions based on question tag
router.route('/questions/single/qpool_index')
	.get(questionController.queryTagQuestion);

// Return all questions based on a user id
router.route('/questions/single/user_index')
	.get(questionController.queryUserQuestion);

// Delete a question
// Args: question_id
router.route('/questions/delete')
	.post(questionController.deleteQuestion);

module.exports = router;