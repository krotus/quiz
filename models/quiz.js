//Definición del modelo de Quiz
//tabla Quiz i objeto Quiz
module.exports = function(sequelize, DataTypes){
  return sequelize.define('Quiz',
                          {
                            pregunta: DataTypes.STRING,
                            respuesta: DataTypes.STRING
                          });
};
