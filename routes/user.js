const express = require('express')
const Review = require('../models').Review
const Comment = require('../models').Comment
const User = require('../models').User
const Restaurant = require('../models').Restaurant
const bodyParser = require('body-parser')
let userRoute = express.Router()
userRoute.use(bodyParser.json())

userRoute
.post('/signup', (req,res)=>{
    User.create({
        userName: req.body.userName,
        firstName: req.body.firstName
    }).then((user)=>{
        res.status(200).send(user)
    }).catch((err)=>{
        res.status(404).send(err)
    })
})
//get my previous reviews including the comment with commentor and the restaurant it belong too
.get('/getmyreview',(req,res)=>{
    Review.findAll({include: [{ model: Comment, nested: true,include:{model:User,as:'Commentor'} }
,{model:Restaurant}]},{ UserId: '1'})
    .then((userReviews)=>{
         res.status(200).send({userReviews})
    })
})
.get('/getmycomment',(req,res)=>{
    Comment.findAll({include: [{ model: Review, nested: true,include:{model:User,as:'Reviewer' }}
    ]},{ UserId: '1'})
    .then((userComments)=>{    //{include: [{ all: true, nested: true }]}
         res.status(200).send({userComments})
    }).catch((err)=>{
        res.status(400).send(err)
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