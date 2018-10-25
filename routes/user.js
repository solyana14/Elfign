const express = require('express')
const Review = require('../models').Review
const User = require('../models').User
const Restaurant = require('../models').Restaurant
const Ratings = require('../models').Ratings
const Location = require('../models').Location
const Cusine = require('../models').Cusine
const bodyParser = require('body-parser')
let userRoute = express.Router()
userRoute.use(bodyParser.json())
var newFav
userRoute
.post('/signup', (req,res)=>{//sample user signup
    User.create({
        userName: req.body.userName,
        firstName: req.body.firstName,
        email:req.body.email,
        lastName:req.body.lastName
        //password: req.body.password
    }).then((user)=>{
        res.status(200).send(user)
    }).catch((err)=>{
        res.status(400).send(err)
    })
})

// .post('/login', (req,res)=>{//sample user signup
//     // res.send('i really hope this works')
//     User.findOne({username: req.body.username})
//     .then((user)=>{
//         if(!user){ //didn't input any username
//         res.status(401).json({message:"no user by that name"})
//         }else{
//             if(user.password === req.body.password){
//                 // let payload ={
//                 //     username: req.body.username
//                 // }
//                 // let secret = configration.env.secret
//                 // let token = jwt.sign(payload,secret)

//                 res.status(200).json({
//                     message:"correct userr so logged in"
//                     // token
//             })
//             }else{
//                 res.status(401).json({message:"incorrect password"})
//             }
//         }
//     }).catch((err)=>{
//         res.status(404).send(err)
//     })
// })
//** This route is for testing only */
.get('/all',(req,res)=>{
    User.findAll().then(users=>{
        res.send(users)
    })
})
//get my previous reviews including  the restaurant it belongs too
.get('/getmyreview/:id',(req,res)=>{
    //{ all: true, nested: true }
    Review.findAll({include: [{ model: Ratings, nested: true },  {model: Restaurant}]},{ UserId: req.params.id})
    .then((userReviews)=>{
         res.status(200).send({userReviews})
    })
})
//get the user details name,favourite places, past reviews
.get('/profile/:id',(req,res)=>{
    User.findOne({
    include: [{ model: Review, include:{model: Ratings}},{ model: Restaurant, as: "Favourites",include:[{model: Cusine,attributes:["name"]}] }],
    where:{id:req.params.id}})//{include: [{ all: true, nested: true }]}//{include: [{ model: Restaurant,as:'Favourites' },{UserId:'1'}]}
    .then((user)=>{
         res.status(200).send(user )
    }).catch((err)=>{

        res.status(400).send(err)
    })
})
// ** this should only return the favouries only 
.get('/favourites/:id',(req,res)=>{
    User.findOne({ where:{id:req.params.id},include:[{model:Restaurant, as:'Favourites', include:[{model:Location}]}]
    }).then((result)=>{
        res.send({Favourites:result.Favourites})
    })
})
//add favourite restaurant to a user
.get('/add/favourites/:RestId/:id',(req,res)=>{
    Restaurant.findById(req.params.RestId)
    .then((restaurant)=>{
         newFav = restaurant;
        return User.findById(req.params.id)
    }).then((user)=>{
            user.setFavourites(newFav)
            res.status(200).send({Message:'succesfully added to favourites'})
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

.delete('/delete/:id',(req,res)=>{
    User.destroy({where:{id:req.params.id}}).then((user)=>{
        res.status(200).send({user})
    }).catch(err=>{
        res.status(500).send( err)
    })
})
//this is very IMPORTANTTTT
.patch('/update/:id', (req, res) => {
    const updates = req.body.updates;
    //send updates from the body as object for flexibility of updating as many cloumns as we want
    User.findOne({where: { id: req.params.id }
    }).then(user => {
        return user.updateAttributes(updates)
      })
      .then(updatedUser => {
        res.send({updatedUser});
      })
      .catch(err=>{
        res.status(400).send( err)
    });
  });
module.exports = {userRoute}