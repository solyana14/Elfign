'use strict';
module.exports = (sequelize, DataTypes) => {
  var Review = sequelize.define('Review', {
    body: {
      type: DataTypes.STRING,
      allowNull: false
    },
    title: {
      type: DataTypes.STRING,
      allowNull:false
    }
    //** add  paranoid: true;a deleted record (table row) will not be returned in future queries  */
  },
   {validate:{
    bothOrNone(){
      //** body should not work without title */
      // if((this.body === null) !== (this.title === null)){
      //   throw new Error('Require either both body and title or neither')
      // }
      // if(this.Reviewer===null){
      //   console.log('hhehehehehhetehnjdscaus')
      // }
    }
  }});
  Review.associate = (models) => {
    // associations can be defined here
    //Review.hasMany(models.Comment)
    //Customers.hasOne(Address, {foreignKey: 'fk_customerid', targetKey: 'uuid'});
   // Review.hasOne(models.Ratings);
    Review.belongsTo(models.Ratings)
    Review.belongsTo(models.Restaurant,{onDelete: 'CASCADE'})
    Review.belongsTo(models.User,{as: 'Reviewer', foreignKey: 'UserId',onDelete: 'CASCADE'})
  };
  return Review;
};