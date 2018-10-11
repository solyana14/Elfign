'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      firstName: {
        type: Sequelize.STRING,
        allowNull:false
      },
      userName: {
        type: Sequelize.STRING,
        allowNull:false,
        unique:true
      },
      lastName:{
        type: Sequelize.STRING,
        allowNull: false,
        // validate: {
        //     len: {
        //         args: 3,
        //         msg: "Name must be atleast 3 characters in length"
        //     }
        // }
    },
    email:{
      type: Sequelize.STRING,
      allowNull: false,
      unique: true,
      // validate: {
      //     len: {
      //         args: 3,
      //         msg: "Name must be atleast 3 characters in length"
      //     }
      // }
  },
      createdAt: {
        //allowNull: false,
        type: Sequelize.DATE,
        
      },
      updatedAt: {
        //allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Users');
  }
};