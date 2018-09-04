const express = require('express')
const bodyParser = require('body-parser')
const Review = require('../models').Review
const Comment = require('../models').Comment
const User = require('../models').User
let reviewRoute = express.Router()

reviewRoute.use(bodyParser.json())
//createa review(a user) for a specific resturant
reviewRoute
.post('/create',(req,res)=>{
    Review.create({
        body:'this is a revieww body',
        title: 'title of Review',
        UserId:'1', //userId and restaurantId is generated from the req.params
        RestaurantId:'1'
   }).then((result)=>{
       res.status(200).send( result)
   })
})
//get ALL reviews for a specific restaurant
.get('/getall',(req,res)=>{
        Review.findAll({include: [{ all: true, nested: true }]},{ RestaurantId: '1'}).then((reviews)=>{
             res.status(200).send(reviews)
        })
})

//get  a review for a specific restaurant
.get('/getreview',(req,res)=>{
    Review.findAll({include: [{ all: true, nested: true }]},{ RestaurantId: '1',  ReviewId: '1'})
    .then((reviews)=>{
         res.status(200).send(reviews)
    })
})
module.exports= {reviewRoute}