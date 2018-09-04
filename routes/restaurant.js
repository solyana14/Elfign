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
//get all restaurant and it associated review and comment
.get('/getall',(req,res)=>{
        Restaurant.findAll({include: [{ all: true, nested: true }]}).then((restaurants)=>{
             res.status(200).send(restaurants)
        })
})
//get a specific restaurant and it associated review and comment for a specific user(Favourites)
.get('/getrestaurant',(req,res)=>{
    Restaurant.findAll({include: [{ all: true, nested: true }]},{ UserId: '2'},{
        RestaurantId: '1'}).then((restaurants)=>{
         res.status(200).send(restaurants)
    })
})
module.exports= {restaurantRoute}