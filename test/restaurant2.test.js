const chai = require('chai');
const chaiHttp = require('chai-http');
const Restaurant = require('../models').Restaurant;
const restaurantRoute=require('../routes/review')
const should = chai.should()
const {app} = require('../server')
const truncate =require ('./truncate')
chai.use(chaiHttp)
describe('Review',()=>{
    beforeEach(()=>{
        // ** it should remove contents before running the test
       //await truncate()
       
       console.log('deleted i think')
    })
    it('should update a Restaurant with a specific Id',(done)=>{
        chai.request(app)
        .patch('/restaurant/update/1')
        .send({
            "updates":{
                "name": "the new name os the restaurant",
                "email": "newEmail@yahoo.com"
            }
        })
        .end((err,res)=>{
            console.log(res.body)
            res.body.should.be.a('Object')
            res.body.updatedRestaurant.should.be.a('Object') //1 or 0
            res.should.have.status(200)
            done()
        })
    })

    /**
     * the delete works uncomment when done with beforEach and afterEach hooks
     */
    // it('should delete a Review with a specific Id',(done)=>{
    //     chai.request(app)
    //     .delete('/restaurant/delete/1')
    //     .end((err,res)=>{
    //         //console.log(res.body)
    //         res.body.should.be.a('Object')
    //          res.body.restaurant.should.be.a('Number') //1 or 0
    //         done()
    //     })
    // })
    it('should fail to delete a Restaurant with a wrong Id',(done)=>{
        chai.request(app)
        .delete('/restaurant/delete/1yt')
        .end((err,res)=>{
            //console.log(app.config)
            console.log(res.body)
            res.body.should.be.a('Object')
            res.should.have.status(500)
            done()
        })
    })
    // afterEach((done)=>{
    //     truncate();
    //     done()
    // }) 
})


