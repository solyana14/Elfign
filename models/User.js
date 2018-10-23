'use strict';
module.exports = (sequelize, DataTypes) => {
  var User = sequelize.define('User', {
    firstName:{
      type: DataTypes.STRING,
      allowNull: false,
      isAlpha:true,
  },
  lastName:{
    type: DataTypes.STRING,
    isAlpha:true,
    allowNull: false,
},
    userName:{
     type: DataTypes.STRING,
     unique:true,
     validate:{
       len:{
         args:[6,10],
         msg:"username must be between length 6-10"
       }
     }
    } ,
    email:{
      type: DataTypes.STRING,
      unique:{
        name: 'users_email',
        msg: 'A user with this email already exists.',
      },
      allowNull: false,
      validate: {
        notEmpty: true,
        isEmail: true,
      }
    },
  },
{ });
  User.associate = (models)=> {
    // associations can be defined here
    User.hasMany(models.Review)//{as: 'MyReviews'}
    //User.hasMany(models.Comment)//{as: 'MyComments'}
    User.belongsToMany(models.Restaurant,{as:'Favourites',through: 'UserRestaurant', foreignKey: 'UserId',otherKey: 'RestaurantId'})
  };
  return User;
};