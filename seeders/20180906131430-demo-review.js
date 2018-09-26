'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
      return queryInterface.bulkInsert('Reviews', [
        { 
        title: 'the story of me',
        body: 'tvagfyugfeyhbdailehfur',
        UserId:'1', //userId and restaurantId is generated from the req.params
        RestaurantId:'1'
      },
        { title: 'ugly love',
        body: 'colleen hoover best auhter ever',
        UserId:'1', //userId and restaurantId is generated from the req.params
        RestaurantId:'1'},
        { title: 'wait for me',
        body: 'jennifer lynn',
        UserId:'1', //userId and restaurantId is generated from the req.params
        RestaurantId:'1'
      }
      ], {});
    
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Reviews',null,{})
    
  }
};
