const express = require('express')
const bodyParser = require('body-parser')
const Review = require('../models').Review
const Restaurant = require('../models').Restaurant
const Cusine = require('../models').Cusine
const User = require('../models').User
const Ratings = require('../models').Ratings
let restaurantRoute = express.Router()
const Location = require('../models').Location
restaurantRoute.use(bodyParser.json())
let testRestaurant;
restaurantRoute
//create a restaurant
/** here don't create the restaurant if all the models don't create the
i.e if Location fails the restaurant should fail
*/
.post('/create',(req,res)=>{
    Restaurant.create({
        name:req.body.name,
        phoneNumber:req.body.phoneNumber,
        webSite: req.body.webSite,
        email:req.body.email
   }).then((restaurant)=>{  
       testRestaurant=restaurant
       return Location.create({
           longitude: req.body.longitude,
           latitude: req.body.latitude,
           relativeLocation:req.body.relativeLocation
       }).then(location=>{
           //location.setRestaurant(testRestaurant);
           testRestaurant.setLocation(location)
           return Cusine.findOrCreate({where:{name:req.body.cusine}})
           .spread((cusine,created)=>{
               //console.log(testRestaurant.CusineId)
               testRestaurant.setCusines(cusine)
               res.status(200).send(testRestaurant)
           })
           //res.status(200).send(testRestaurant)
       })
   }).catch(err=>{
    res.status(404).send( err)
})
})
// .post('/addcusine/:id',(req,res)=>{
//     Cusine.findOrCreate({where:{name:req.body.name}}).then((cusine,created)=>{
//         Restaurant.findOne({where:{id:req.params.id}}).then(resturant=>{
//             resturant.setCusines(cusine)
//             res.send(resturant)
//         })
//     }).catch(err=>{
//         res.send(err)
//     })
// })
// ***add a cusine to a restaurant
// .post('/addcusine/:id',(req,res)=>{
//     Cusine.findOrCreate({where:{name:'hhh'}}).then(cusine=>{
//         Restaurant.findOne({where:{id:req.params.id}}).then(resturant=>{
//             resturant.setCusines(cusine)
//             res.send(resturant)
//         }).catch(err=>{
//             res.status(404).send("err: ",err)
//         })
//     })
// })

//get all restaurant and it associated review
.get('/getrestaurant',(req,res)=>{
        Restaurant.findAll({include: 
            [{ model: Review,include:[{model: User, as:'Reviewer'},{model: Ratings}]  },
            {model: Location},{model:Cusine}
        ]}).then((Restaurants)=>{
             res.status(200).send({Restaurants})
        }).catch(err=>{
            res.status(404).send('error: ', err)
        })
})//{include: [{ all: true, nested: true }]}

//get a specific restaurant and its associated review
.get('/getrestaurant/:id',(req,res)=>{
    Restaurant.findAll({where: {id:req.params.id},include: [{ all: true, nested: true }]}).then((restaurant)=>{
         res.status(200).send({restaurant})
    }).catch(err=>{
        res.status(404).send('error: ', err)
    })
})
//get details of the resturant only with out reviews
.get('/getdetails/:id',(req,res)=>{
    Restaurant.findAll({include: 
        [{ model: Cusine  },
        {model: Location}
    ]}).then((Restaurants)=>{
         res.status(200).send({Restaurants})
    }).catch(err=>{
        res.status(404).send('error: ', err)
    })
})
.delete('/deleteone/:id',(req,res)=>{
    Restaurant.destroy({where:{id:req.params.id}}).then((restaurant)=>{
        res.status(200).send({restaurant})
    }).catch(err=>{
        res.status(404).send('error: ', err)
    })
})
// **** Need to figure out how to do the n*m associations here
//get a specific restaurant and it associated review and comment for a specific user(Favourites)
// .get('/addsomething here',(req,res)=>{
//     Restaurant.findAll({where: { UserId: '2',RestaurantId: '1'}, 
//     include: [{ all: true, nested: true }]},).then((restaurants)=>{
//          res.status(200).send(restaurants)
//     }).catch(err=>{
//         res.status(404).send('error: ', err)
//     })
// })

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