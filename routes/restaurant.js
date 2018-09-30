const express = require('express')
const bodyParser = require('body-parser')
const Review = require('../models').Review
const Restaurant = require('../models').Restaurant
const Cusine = require('../models').Cusine
const User = require('../models').User
let restaurantRoute = express.Router()
const Location = require('../models').Location
restaurantRoute.use(bodyParser.json())
let testRestaurant;
restaurantRoute
//create a restaurant
.post('/create',(req,res)=>{
    let phoneNumber = parseInt(req.body.phoneNumber)
    console.log(phoneNumber)
    Restaurant.create({
        name:req.body.name,
        phoneNumber:req.body.phoneNumber,
        webSite: req.body.webSite,
   }).then((restaurant)=>{  
       testRestaurant=restaurant
       return Location.create({
           longitude: 9.3653746,
           lattitude: 34.4627364,
           relativeLocation: 'some where around tele'
       }).then(location=>{
           //location.setRestaurant(testRestaurant);
           testRestaurant.setLocation(location)
           return Cusine.findOrCreate({where:{name:'kitfo'}})
           .spread((cusine,created)=>{
               //console.log(testRestaurant.CusineId)
               testRestaurant.setCusines(cusine)
               res.status(200).send(testRestaurant)
           })
           //res.status(200).send(testRestaurant)
       })
   })
})
//get all restaurant and it associated review
.get('/getrestaurant',(req,res)=>{
        Restaurant.findAll({include: [{ all: true, nested: true }]}).then((Restaurants)=>{
             res.status(200).send({Restaurants})
        })
})
//get a specific restaurant and its associated review
.get('/getrestaurant/:id',(req,res)=>{
    Restaurant.findAll({where: {id:req.params.id},include: [{ all: true, nested: true }]}).then((restaurant)=>{
         res.status(200).send({restaurant})
    })
})
.delete('/deleteone/:id',(req,res)=>{
    Restaurant.destroy({where:{id:req.params.id}}).then((restaurant)=>{
        res.status(200).send({restaurant})
    })
})
// **** Need to figure out how to do the n*m associations here
//get a specific restaurant and it associated review and comment for a specific user(Favourites)
.get('/addsomething here',(req,res)=>{
    Restaurant.findAll({where: { UserId: '2',RestaurantId: '1'}, 
    include: [{ all: true, nested: true }]},).then((restaurants)=>{
         res.status(200).send(restaurants)
    })
})

// ** add an update route to update a review


//this is very IMPORTANTTTT
// PATCH single owner
// app.patch('/owner/:id', (req, res) => {
//     const id = req.params.id;
//     const updates = req.body.updates;
//     db.owners.find({
//       where: { id: id }
//     })
//       .then(owner => {
//         return owner.updateAttributes(updates)
//       })
//       .then(updatedOwner => {
//         res.json(updatedOwner);
//       });
//   });
module.exports= {restaurantRoute}