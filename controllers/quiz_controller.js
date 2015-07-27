//GET /quizes/question
exports.question = function(req, res){
  res.render('quizes/question', {title: 'Pregunta Quiz', pregunta: 'Capital de Italia'});
};

//GET /quizes/answer
exports.answer = function(req, res){
  if(req.query.respuesta === 'Roma'){
    res.render('quizes/answer', {title: 'Respuesta Quiz', respuesta: 'Correcto'});
  }else{
    res.render('quizes/answer', {title: 'Respuesta Quiz', respuesta: 'Incorrecto'});
  }
};
