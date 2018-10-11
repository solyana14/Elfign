 // test/truncate.js
const map =require ('lodash/map');
const models = require('../models');
// const Review = require('../models').Review;
let truncate = async function(){
    return await Promise.all(
        map(Object.keys(models), (key) => {
          if (['sequelize', 'Sequelize'].includes(key)) return null;
          return models[key].destroy({ where: {}, force: true });
        })
      );
}

module.exports =truncate
// export default async function truncate() {
//   return await Promise.all(
//     map(Object.keys(models), (key) => {
//       if (['sequelize', 'Sequelize'].includes(key)) return null;
//       return models[key].destroy({ where: {}, force: true });
//     })
//   );
// }