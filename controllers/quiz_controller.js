var models = require('../models/models.js');

// Autoload - factoriza el código si a la ruta incluye :quizId
exports.load = function(req, res, next, quizId) {
  models.Quiz.findById(quizId).then(
    function(quiz) {
      if (quiz) {
        req.quiz = quiz;
        next();
      } else { next(new Error('No existe quizId=' + quizId)); }
    }
  ).catch(function(error) { next(error);});
};

//GET /quizes
exports.index = function(req, res){
  models.Quiz.findAll().then(function(quizes){
    res.render('quizes/index', {title: 'Lista Preguntas', quizes: quizes});
  }).catch(function(error){
      next(error);
  });
};


//GET /quizes/:id
exports.show = function(req, res){
  res.render('quizes/show', {title: 'Pregunta Quiz', quiz: req.quiz});
};

//GET /quizes/:id/answer
exports.answer = function(req, res){
  var resultado = 'Incorrecto';
  if(req.query.respuesta === req.quiz.respuesta){
    resultado = 'Correcto';
  }
  res.render('quizes/answer', {title: 'Respuesta Quiz', respuesta: resultado, quiz: req.quiz});
};
