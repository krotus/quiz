// GET /login --Formulario de login
exports.new = function(req, res){
  var errors = req.session.errors || {};
  req.session.errors = {};

  res.render('sessions/new', {title: "Login", errors: errors});
};

// POST /login --Crear la sesion si usuario se autentica
exports.create = function(req, res){
  var login = req.body.login;
  var password = req.body.password;

  var userController = require('./user_controller');
  userController.autenticar(login, password, function(error, user){
    if(error){// Si hay error retornamos el error de sesion a la vista
      req.session.error = [{"message": 'Se ha producido un error: '+error}];
      res.redirect("/login");
      return;
    }
    //Crear req.session.user y guardamos campos id y username
    //La sesion se define por la existencia de: req.session.user
    req.session.user = {id:user.id, username:user.username};
    res.redirect(req.session.redir.toString()); //redirección a path anterior a login

  });
};

//DELETE /logout --Destruir la sesion
exports.destroy = function(req, res){
  delete req.session.user;
  res.redirect(req.session.redir.toString()); //redirect a path anterior a login
};
