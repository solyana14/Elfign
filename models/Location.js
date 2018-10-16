'use strict';
module.exports = (sequelize, DataTypes) => {
  /**
   * fix the validation here non work
   */
  const Location = sequelize.define('Location', {
    longitude: {
      type: DataTypes.FLOAT,
      //allowNull:true,
      validate:{
        isFloat:true,
        max: {
          args:[180.0],
          msg:"longitude can't be  more than 10"
        },                  // only allow values <= 23
      min: {
        args: [0],
        msg:"longitude can't be less than 0"
      }
      }
    },
    latitude: {
      type: DataTypes.FLOAT,
      //allowNull:true,
      validate:{
        isFloat:true,
        max: {
          args:[180.0],
          msg:"latitude  can't be more than 180"
        },                  // only allow values <= 23
      min: {
        args: [0],
        msg:"latitude can't be less than 0"
      }
      }
    },
    relativeLocation: {
      type: DataTypes.STRING,
      allowNull:false
    }
  }, {
    validate: {
    bothCoordsOrNone() {
      if ((this.latitude === null) !== (this.longitude === null)) {
        throw new Error('Require either both latitude and longitude or neither')
      }
    }
  }
});
  Location.associate = function(models) {
    // associations can be defined here
    //Location.belongsTo(models.Restaurant)
    Location.hasOne(models.Restaurant)
  };
  return Location;
};