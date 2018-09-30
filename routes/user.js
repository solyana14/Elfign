const express = require('express')
const Review = require('../models').Review
const Comment = require('../models').Comment
const User = require('../models').User
const Restaurant = require('../models').Restaurant
const bodyParser = require('body-parser')
let userRoute = express.Router()
userRoute.use(bodyParser.json())
var newFav
userRoute.post('/signup', (req,res)=>{//sample user signup
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
    Review.findAll({include: [{ all: true, nested: true }]},{ UserId: 1})
    .then((userReviews)=>{
         res.status(200).send({userReviews})
    })
})

.get('/profile',(req,res)=>{
    User.findAll({include: [{ all: true, nested: true }],where:{id:1}})//{include: [{ all: true, nested: true }]}//{include: [{ model: Restaurant,as:'Favourites' },{UserId:'1'}]}
    .then((user)=>{
         res.status(200).send(user )
    }).catch((err)=>{
        res.status(400).send(err+'fffffff')
    })
})
// ** this should only return the favouries only 
// .get('/favourites',(req,res)=>{
//     User.findOne({
//         where:{id:'1'},attributes:['Favourites']
//     }).then((result)=>{
//         res.send(result)
//     })
// })
//add favourite restaurant to a user
.get('/add/favourites',(req,res)=>{
    Restaurant.findById('2')
    .then((restaurant)=>{
         newFav = restaurant;
        return User.findById('1')
    }).then((user)=>{
            user.setFavourites(newFav)
            res.status(200).send('succesfully added to favourites')
    }).catch(err=>res.send(err))
  
    // Restaurant.findAll({include:[{model:User,where:{ UserId:'1' }}]
      
    // })

    // Project.findAll({
	// 	attributes: ['code', 'name'],
	// 	include: [{
	// 		model:User, as: 'Workers',
	// 		attributes: [['firstname', 'name'], 'age'],
	// 		through: {
	// 			attributes: ['projectId', 'userId'],
	// 		}
	// 	  }]
	// }).then(projects => {
	//    res.send(projects);
	// });
})
module.exports = {userRoute}