const express = require('express')
const Review = require('../models').Review
const Comment = require('../models').Comment
const User = require('../models').User
const Restaurant = require('../models').Restaurant
const bodyParser = require('body-parser')
let userRoute = express.Router()
userRoute.use(bodyParser.json())

userRoute
.post('/signup', (req,res)=>{//sample user signup
    User.create({
        userName: req.body.userName,
        firstName: req.body.firstName
    }).then((user)=>{
        res.status(200).send(user)
    }).catch((err)=>{
        res.status(404).send(err)
    })
})
//get my previous reviews including  the restaurant it belongs too
.get('/getmyreview',(req,res)=>{
    Review.findAll({include: [{ all: true, nested: true }]},{ UserId: '1'})
    .then((userReviews)=>{
         res.status(200).send({userReviews})
    })
})

.get('/profile',(req,res)=>{
    Restaurant.findAll({include: [{ model: Restaurant,as:'Favourites' },{UserId:'1'}]})//{include: [{ all: true, nested: true }]}
    .then((user)=>{
         res.status(200).send(user +'ddddddd')
    }).catch((err)=>{
        res.status(400).send(err+'fffffff')
    })
})
//add favourite restaurant to a user
// .post('/add/favourites',(req,res)=>{
//     Restaurant.
// })
module.exports = {userRoute}