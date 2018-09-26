'use strict';

var fs        = require('fs');
var path      = require('path');
var Sequelize = require('sequelize');
var basename  = path.basename(__filename);

require('dotenv').config()
//process.env.NODE_ENV='test'
 var env       = process.env.NODE_ENV || 'development';
//var env  = 'test';
var config = require(__dirname + '/../config/config')[env]
console.log(config)
//var config    = require(__dirname + '/..\config\config.json')[env];
console.log(env)
var db        = {};
//creates a connection to the database
if (config.use_env_variable) {
  var sequelize = new Sequelize(process.env[config.use_env_variable], config);
  console.log('using enviromental variables')
} else {
  var sequelize = new Sequelize(config.database, config.username, config.password, config);
  console.log('using config file')
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (file.indexOf('.') !== 0) && (file !== basename) && (file.slice(-3) === '.js');
  })
  .forEach(file => {//walks through the local folder and invokes sequelize.import on each model file
    var model = sequelize['import'](path.join(__dirname, file));
    db[model.name] = model; //stores the associated model by its name,
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;
