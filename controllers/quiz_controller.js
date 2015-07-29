var models = require('../models/models.js');

//GET /quizes
exports.index = function(req, res){
  models.Quiz.findAll().then(function(quizes){
    res.render('quizes/index', {title: 'Lista Preguntas', quizes: quizes});
  });
};

//GET /quizes/:id
exports.show = function(req, res){
  models.Quiz.findById(req.params.quizId).then(function(quiz){
      res.render('quizes/show', {title: 'Pregunta Quiz', quiz: quiz});
  });

};

//GET /quizes/:id/answer
exports.answer = function(req, res){
  models.Quiz.findById(req.params.quizId).then(function(quiz){
    if(req.query.respuesta === quiz.respuesta){
      res.render('quizes/answer', {title: 'Respuesta Quiz', respuesta: 'Correcto', quiz: quiz});
    }else{
      res.render('quizes/answer', {title: 'Respuesta Quiz', respuesta: 'Incorrecto', quiz: quiz});
    }
  });
};
