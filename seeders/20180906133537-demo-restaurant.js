'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Restaurants', [
      {
        name:'Kategna',
        phoneNumber:742720347,
        webSite: 'katena@addis.com',
   },
   {
    name:'Mamis kitfo',
    phoneNumber:8987654,
    webSite: 'natsolmen@yahoo.com',
},
{
  name:'Dimitri',
  phoneNumber:2345678,
  webSite: 'Dimaddis@gmail.com',
}
    ], {});
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('Restaurants',null,{})
  }
};
