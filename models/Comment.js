'use strict';
module.exports = (sequelize, DataTypes) => {
  var Comment = sequelize.define('Comment', {
    body: DataTypes.STRING,
    title: DataTypes.STRING
  }, {});
  Comment.associate = (models) =>{
    // associations can be defined here
   // Comment.belongsTo(models.Review, {foreignKey: 'ReviewId', onDelete: 'CASCADE'})
    //Comment.hasOne(model.User) //add comment id to User as foriegn key
   // Comment.belongsTo(models.User, {as: 'Commentor', foreignKey: 'UserId'})//add userId to comment
  };
  return Comment;
};