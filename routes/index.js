var express = require('express');
var router = express.Router();

//Controllers
var quizController = require('../controllers/quiz_controller');
var commentController = require('../controllers/comment_controller');

// Página de entrada
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Quiz' , errors: []});
});

// Autoload de comandos con :quizId
router.param('quizId', quizController.load); //autoload :quizId

//Definición de rutas de /quizes
router.get('/quizes', quizController.index); //list of quizes
router.get('/quizes/:quizId(\\d+)', quizController.show); //uniq quize from id
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer); //uniq answer from quiz
router.get('/quizes/new', quizController.new);//router to view form
router.post('/quizes/create', quizController.create);//router to create question by obj
router.get('/quizes/:quizId(\\d+)/edit', quizController.edit);//router to edit page of question
router.put('/quizes/:quizId(\\d+)/update', quizController.update);//router to update question
router.delete('/quizes/:quizId(\\d+)/delete', quizController.delete);//router to update question

//Definición de rutas de /comments
router.get('/quizes/:quizId(\\d+)/comments/new', commentController.new);
router.post('/quizes/:quizId(\\d+)/comments', commentController.create);

module.exports = router;
