'use strict';
module.exports = (sequelize, DataTypes) => {
  const Ratings = sequelize.define('Ratings', {
    wifi:{
      type: DataTypes.FLOAT,
      //allowNull: true,
      validate:{
        isFloat:true,
        max: {
          args:[10],
          msg:"can't rate wifi more than 10"
        },                  // only allow values <= 23
      min: {
        args: [0],
        msg:"can't rate wifi less than 0"
      }
      }
    } ,
    cleanliness:{
      type: DataTypes.FLOAT,
      //allowNull: true,
      validate:{
        isFloat:true,
        max: {
          args:[10],
          msg:"can't rate cleanliness more than 10"
        },                  // only allow values <= 23
      min: {
        args: [0],
        msg:"can't rate cleanliness less than 0"
      }
      }
    },
    foodQuality: {
      type: DataTypes.FLOAT,
      //allowNull: true,
      validate:{
        isFloat:true,
        max: {
          args:[10],
          msg:"can't rate foodQuality more than 10"
        },                  // only allow values <= 23
      min: {
        args: [0],
        msg:"can't rate foodQuality less than 0"
      }
      }
    },
    service: {
      type: DataTypes.FLOAT,
      //allowNull: true,
      validate:{
        isFloat:true,
        max: {
          args:[10],
          msg:"can't rate service more than 10"
        },                  // only allow values <= 23
      min: {
        args: [0],
        msg:"can't rate service less than 0"
      }
      }
    },
    location: {
      type: DataTypes.FLOAT,
      //allowNull: true,
      validate:{
        isFloat:true,
        max: {
          args:[10],
          msg:"can't rate location more than 10"
        },                  // only allow values <= 23
      min: {
        args: [0],
        msg:"can't rate location less than 0"
      }
      }
    },
    parking:{
      type: DataTypes.FLOAT,
      //allowNull: true,
      validate:{
        isFloat:true,
        max: {
          args:[10],
          msg:"can't rate parking more than 10"
        },                  // only allow values <= 23
      min: {
        args: [0],
        msg:"can't rate parking less than 0"
      }
      }
    }
  }, {});
  Ratings.associate = function(models) {
    // associations can be defined here
    //Review.belongsTo(models.Restaurant,{onDelete: 'CASCADE'})
   // Ratings.belongsTo(models.Review)
    Ratings.hasOne(models.Review)
    //Address.belongsTo(Customers, {foreignKey: 'fk_customerid', targetKey: 'uuid'});
  };
  return Ratings;
};