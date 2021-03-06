var models = require('../models/models.js');

// Autoload - factoriza el código si a la ruta incluye :quizId
exports.load = function(req, res, next, quizId) {
  models.Quiz.find({
            where: {
                id: Number(quizId)
            },
            include: [{
                model: models.Comment //array of comments from one question 
            }]
        }).then(function(quiz) {
      if (quiz) {
        req.quiz = quiz;
        next();
      } else{next(new Error('No existe quizId=' + quizId))}
    }
  ).catch(function(error){next(error)});
};

//GET /quizes
exports.index = function(req, res){
  models.Quiz.findAll().then(function(quizes){
    res.render('quizes/index', {title: 'Lista Preguntas', quizes: quizes, errors: []});
  }).catch(function(error){
      next(error);
  });
};


//GET /quizes/:id
exports.show = function(req, res){
  res.render('quizes/show', {title: 'Pregunta Quiz', quiz: req.quiz, errors: []});
};

//GET /quizes/:id/answer
exports.answer = function(req, res){
  var resultado = 'Incorrecto';
  if(req.query.respuesta === req.quiz.respuesta){
    resultado = 'Correcto';
  }
  res.render('quizes/answer', {title: 'Respuesta Quiz', respuesta: resultado, quiz: req.quiz, errors: []});
};

//GET /quizes/new
exports.new = function(req, res){
  var quiz = models.Quiz.build({
    pregunta: "Pregunta",
    respuesta: "Respuesta"
  });


  res.render('quizes/new', {quiz: quiz, errors: []});
};

// POST /quizes/create
exports.create = function(req, res) {
  var quiz = models.Quiz.build( req.body.quiz );

  quiz
  .validate()
  .then(
    function(err){
      if (err) {
        res.render('quizes/new', {quiz: quiz, errors: err.errors});
      } else {
        quiz // save: guarda en DB campos pregunta y respuesta de quiz
        .save({fields: ["pregunta", "respuesta"]})
        .then( function(){ res.redirect('/quizes')})
      }      // res.redirect: Redirección HTTP a lista de preguntas
    }
  );
};

// GET /quizes/:id/edit
exports.edit = function(req, res){
  var quiz = req.quiz; // autoload de instancia de quiz
  res.render('quizes/edit', {title: 'Editar pregunta', quiz: quiz, errors: []});
};

// PUT /quizes/:id/update
exports.update = function(req, res){
  req.quiz.pregunta = req.body.quiz.pregunta;
  req.quiz.respuesta = req.body.quiz.respuesta;

  req.quiz
  .validate()
  .then(
    function(err){
      if(err){
        res.render('/quizes/edit', {title: 'Editar pregunta', quiz: req.quiz, errors: err.errors});
      }else{// save campos pregunta y respuesta en DB
        req.quiz
        .save({fields: ["pregunta", "respuesta"]})
        .then(function(){
          res.redirect('/quizes'); //redirección HTTP a la lista preguntas
        });
      }
    }
  );
};

// DELETE /quizes/:id/delete
exports.delete = function(req, res){
  req.quiz.destroy()
  .then(function(){res.redirect('/quizes')})
  .catch(function(error){next(error)});
};
