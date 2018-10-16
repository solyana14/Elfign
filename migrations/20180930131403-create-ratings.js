'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Ratings', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      wifi: {
        type: Sequelize.FLOAT,
         //allowNull: true
      },
      cleanliness: {
        type: Sequelize.FLOAT,
        //allowNull: true
      },
      foodQuality: {
        type: Sequelize.FLOAT,
        //allowNull: true
      },
      service: {
        type: Sequelize.FLOAT,
       // allowNull: true
      },
      location: {
        type: Sequelize.FLOAT,
       // allowNull: true
      },
      parking: {
        type: Sequelize.FLOAT,
       // allowNull: true
      },
      ReviewId:{
        type:Sequelize.INTEGER
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      // ReviewId:{
      //   type: Sequelize.INTEGER
      // }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Ratings');
  }
};