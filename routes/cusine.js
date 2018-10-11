// const bodyParser = require('body-parser')
// const Restaurant = require('../models').Restaurant
// const Cusine = require('../models').Cusine

// let restaurantRoute = require('./restaurant')
// // restaurantRoute.use(bodyParser.json())

// //let testRestaurant;
// restaurantRoute
// //create/add a cusine for a resturant
// .post('/addcusine/:id',(req,res)=>{
//     Cusine.findOrCreate({where:{name:req.body.name}}).then((cusine,created)=>{
//         Restaurant.findOne({where:{id:req.params.id}}).then(resturant=>{
//             resturant.setCusines(cusine)
//             res.send(cusine)
//         })
//     }).catch(err=>{
//         res.send(err)
//     })
// })

// // **remove a cusine from A/One resturant
// .patch('/updatecusine/:id',(req,res)=>{
//     Cusine.find({where:{name:'kitfo'}}).then(cusine=>{
//         Restaurant.findOne({where:{id:req.params.id}}).then(resturant=>{
//             resturant.setCusines(cusine)
//             res.send(resturant)
//         }).catch(err=>{
//             res.status(404).send("err: ",err)
//         })
//     })
//     Restaurant.findAll({where: {id:req.params.id},include: [{ all: true, nested: true }]}).then((restaurant)=>{
//          res.status(200).send({restaurant})
//     }).catch(err=>{
//         res.status(404).send('error: ', err)
//     })
// })
// .delete('/deleteone/:id',(req,res)=>{
//     Restaurant.destroy({where:{id:req.params.id}}).then((restaurant)=>{
//         res.status(200).send({restaurant})
//     }).catch(err=>{
//         res.status(404).send('error: ', err)
//     })
// })



// // .post('/create',(req,res)=>{
// //     let phoneNumber = parseInt(req.body.phoneNumber)
// //     console.log(phoneNumber)
// //     Restaurant.create({
// //         name:req.body.name,
// //         phoneNumber:req.body.phoneNumber,
// //         webSite: req.body.webSite,
// //    }).then((restaurant)=>{  
// //        testRestaurant=restaurant
// //        return Location.create({
// //            longitude: 9.3653746,
// //            lattitude: 34.4627364,
// //            relativeLocation: 'some where around tele'
// //        }).then(location=>{
// //            //location.setRestaurant(testRestaurant);
// //            testRestaurant.setLocation(location)
// //            return Cusine.findOrCreate({where:{name:'kitfo'}})
// //            .spread((cusine,created)=>{
// //                //console.log(testRestaurant.CusineId)
// //                testRestaurant.setCusines(cusine)
// //                res.status(200).send(testRestaurant)
// //            })
// //            //res.status(200).send(testRestaurant)
// //        }).catch(err=>{
// //         res.status(404).send('error: ', err)
// //     })
// //    })


// module.exports= {restaurantRoute}


