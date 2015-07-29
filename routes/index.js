var express = require('express');
var router = express.Router();

var quizController = require('../controllers/quiz_controller');

// Página de entrada
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Quiz' });
});

// Autoload de comandos con :quizId
router.param('quizId', quizController.load); //autoload :quizId

//Definición de rutas de /quizes
router.get('/quizes', quizController.index); //list of quizes
router.get('/quizes/:quizId(\\d+)', quizController.show); //uniq quize from id
router.get('/quizes/:quizId(\\d+)/answer', quizController.answer); //uniq answer from quiz
router.get('/quizes/new', quizController.new);//router to view form
router.post('/quizes/create', quizController.create);//router to create question by obj

module.exports = router;
