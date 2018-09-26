const express = require('express')
const bodyParser = require('body-parser')
const Review = require('../models').Review
const Comment = require('../models').Comment
const User = require('../models').User

let reviewRoute = express.Router()

reviewRoute.use(bodyParser.json())
//create a review(a user) for a specific resturant
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
// *** Change this all nested true to the correct models to include and remove un-neccesary inclusions
//get ALL reviews for a specific restaurant
.get('/getreview/:RestId',(req,res)=>{
        Review.findAll({where:{RestaurantId: req.params.RestId} ,include: [{ all: true, nested: true }]} ).then((reviews)=>{
             res.status(200).send({reviews})
        })
})
.get('/getreview/:RestId/:id',(req,res)=>{
    Review.findAll({include: [{ all: true, nested: true }],
        where:{ id: req.params.id,RestaurantId:req.params.RestId}})
    .then((review)=>{
         res.status(200).send({review})
    })
})
.delete('/deletereview/:id',(req,res)=>{
    // *** Change this from find all to deleteOne
    Review.destroy({where:{id:req.params.id}}).then((review)=>{
        res.status(200).send({review})
    })

     // This also works
    // Review.findOne({where:{id:req.params.id}})
    // .then(review=>{
    //     console.log(review)
    //      review.destroy().then((result)=>{
    //         res.send(result)
    //     })
    // })


// ** add an update route to update a review
// PATCH single owner
.patch('/updatereview/:id', (req, res) => {
    const updates = req.body.updates;
    //send updates from the body as object for flexibility of updating as mnay cloumns as we want
    Review.findAll({where: { id: req.params.id }
    }).then(review => {
        return review.updateAttributes(updates)
      })
      .then(updatedReview => {
        res.send({updatedReview});
      });
  });
    
   
})
//get  a review for a specific restaurant

module.exports= {reviewRoute}