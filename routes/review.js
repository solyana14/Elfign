const express = require('express')
const bodyParser = require('body-parser')
const Review = require('../models').Review
const Restaurant = require('../models').Restaurant
const User = require('../models').User
const Ratings = require('../models').Ratings
let reviewRoute = express.Router()

reviewRoute.use(bodyParser.json())
//create a review(a user) for a specific resturant
let testReview;
reviewRoute
//** here if the rating failed it would not still create the review */
.post('/create/:UserId/:RestId',(req,res)=>{
    Review.create({
        body:req.body.body,
        title: req.body.title,
        UserId:req.params.UserId, //userId and restaurantId is generated from the req.params
        RestaurantId:req.params.RestId
   }).then((createdreview)=>{
       console.log(createdreview.validate())
    testReview = createdreview
       return Ratings.create({
        wifi:req.body.wifi,
            cleanliness:req.body.cleanliness,
            foodQuality:req.body.foodQuality,
            service: req.body.service,
            location: req.body.location,
            parking:req.body.parking
       }).then((rating=>{
        testReview.setRating(rating)
        //rating.setReview(review)//this is because the ReviewId is in the rating
        res.status(200).send(testReview)
       }))
   }).catch(err=>{
       res.status(500).send(err)
   })
})
// ** make this creating independet to a review
.post('/createRating/:id',(req,res)=>{
    Ratings.create({
        ReviewId: req.params.id,
        wifi:req.body.wifi,
            cleanliness:req.body.cleanliness,
            foodQuality:req.body.foodQuality,
            service: req.body.service,
            location: req.body.location,
            parking:req.body.parking
       }).then(result=>{
           res.status(200).send(result)
       }).catch(err=>{
           res.status(404).send(err)
       })
})
// *** Change this all nested true to the correct models to include and remove un-neccesary inclusions
//get ALL reviews for a specific restaurant
.get('/getreview/:restId',(req,res)=>{
        Review.findAll({where:{RestaurantId: req.params.restId} ,
            include: [{ model: Ratings, nested: true },
                {model: User,as:'Reviewer'},
                {model: Restaurant}]} ).then((reviews)=>{
             res.status(200).send({reviews})
        }).catch(err=>{
            res.status(404).send('error: ', err)
        })
})
.get('/getreview/:restId/:id',(req,res)=>{
    Review.findOne({include: [{ model: Ratings, nested: true },
        {model: User,as:'Reviewer'},
        {model: Restaurant}],
        where:{ id: req.params.id,RestaurantId:req.params.restId}})
    .then((review)=>{
         res.status(200).send({review})
    }).catch(err=>{
        res.status(404).send('error: ', err)
    })
})
//include: [{ all: true, nested: true }]
.delete('/delete/:id',(req,res)=>{
    // *** Change this from find all to deleteOne
    Review.destroy({where:{id:req.params.id}}).then((review)=>{
        res.status(200).send({review})
}).catch(err=>{
    res.status(500).send( err)
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
})
.patch('/update/:id', (req, res) => {
    const updates = req.body.updates;
    //send updates from the body as object for flexibility of updating as many cloumns as we want
    Review.findOne({where: { id: req.params.id }
    }).then(review => {
        return review.updateAttributes(updates)
      })
      .then(updatedReview => {
        res.send({updatedReview});
      }).catch(err=>{
        res.status(404).send('error: ', err)
    });
  });
    
// .patch('/update/:id', (req,res)=>{
//     const updates = req.body.updates;
//     //send updates from the body as object for flexibility of updating as mnay cloumns as we want
//     Review.findOne({where: { id: req.params.id }
//     }).then(review => {
//         return review.updateAttributes(updates)
//       })
//       .then(updatedReview => {
//         res.send({updatedReview});
//       });
//   });

//get  a review for a specific restaurant

module.exports= {reviewRoute}