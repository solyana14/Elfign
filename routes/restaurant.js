const express = require('express')
const bodyParser = require('body-parser')
const Review = require('../models').Review
const Restaurant = require('../models').Restaurant
const Comment = require('../models').Comment
const User = require('../models').User
let restaurantRoute = express.Router()

restaurantRoute.use(bodyParser.json())

restaurantRoute
//create a restaurant
.post('/create',(req,res)=>{
    Restaurant.create({
        name:'this is a Nmae of the Restaurant',
        phoneNumber:1234567,
        webSite: 'webSite of the restaurant',
   }).then((result)=>{
       res.status(200).send( result)
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