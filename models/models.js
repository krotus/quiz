//Define como se construye todo el modelo

var path = require('path');

// Postgres DATABASE_URL = postgres://user:passwd@host:port/database
// SQLite   DATABASE_URL = sqlite://:@:/
var url = process.env.DATABASE_URL.match(/(.*)\:\/\/(.*?)\:(.*)@(.*)\:(.*)\/(.*)/);
var DB_name  = (url[6]||null);
var user     = (url[2]||null);
var pwd      = (url[3]||null);
var protocol = (url[1]||null);
var dialect  = (url[1]||null);
var port     = (url[5]||null);
var host     = (url[4]||null);
//var storage  = process.env.DATABASE_STORAGE;


//Cargar Modelo ORM
var Sequelize = require('sequelize');

// Usar BBDD SQLite o Postgres
var sequelize = new Sequelize(DB_name, user, pwd,
  { dialect:  protocol,
    protocol: protocol,
    port:     port,
    host:     host,
    //storage:  storage,  // solo SQLite (.env)
    omitNull: true      // solo Postgres
  }
);


//Importar la definición de la tabla Quiz en quiz.js
var quiz_path = path.join(__dirname, 'quiz');
var Quiz = sequelize.import(quiz_path);

//importar la definición de la tabla Comment en comments.js
var comment_path = path.join(__dirname, 'comment');
var Comment = sequelize.import(comment_path);

//Relacion 1 - N
Comment.belongsTo(Quiz); //parte 1 de la relación
Quiz.hasMany(Comment);// parte N de la relación

exports.Quiz = Quiz; // exportar definición de la tabla Quiz
exports.Comment = Comment; // exportar definición de la tabla Comment

// sequelize.sync() crea e inicializa tabla de preguntas en DB
sequelize.sync().then(function(){
  //success(..) ejecuta el manejador una vez creada la tabla
  Quiz.count().then(function(count){
    if(count === 0){ //si no hay elementos en la tabla registraremos uno
      Quiz.create({
        pregunta: 'Capital de Italia',
        respuesta: 'Roma'
      });
      Comment.create({
        texto: 'Hello',
        QuizId: 1
      });
      Quiz.create({
        pregunta: 'Capital de Portugal',
        respuesta: 'Lisboa'
      }).then(function(){console.log('Base de datos inicializada')});
    }
  });
});
