// const express = require('express')
// const bodyParser = require('body-parser')
// const Review = require('../models').Review
// const Comment = require('../models').Comment
// const User = require('../models').User
// let commentRoute = express.Router()

// commentRoute.use(bodyParser.json())
// //create a comment
// commentRoute
// .post('/create',(req,res)=>{
//     Comment.create({
//         body:'this is a comment',
//         title: 'title',
//         UserId:'1',
//         ReviewId: '1'
//    }).then((result)=>{
//        res.status(200).send( result)
//    })
// })
// //get all comments
// // .get('/getallcomments',(req,res)=>{
// //         Comment.findAll({include: [{ all: true, nested: true }]}).then((comments)=>{
// //              res.status(200).send(comments)
// //         })
// // })
// //get comments with for a specific review
// .get('/getcomment',(req,res)=>{
//     Comment.findAll({include: [{model: User, as:"Commentor" }]},{
//         ReviewId: '1'
//     }).then((comments)=>{
//         res.status(200).send(comments)
//     })
// })
// module.exports= {commentRoute}