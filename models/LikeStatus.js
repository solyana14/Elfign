'use strict';
module.exports = (sequelize, DataTypes) => {
  const LikeStatus = sequelize.define('LikeStatus', {
    isLike: DataTypes.BOOLEAN
  }, {});
  LikeStatus.associate = function(models) {
    // associations can be defined here
  };
  return LikeStatus;
};