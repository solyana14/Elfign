const chai = require('chai');
const chaiHttp = require('chai-http');
const Restaurant = require('../models').Restaurant;
const restaurantRoute=require('../routes/review')
const should = chai.should()
const {app} = require('../server')
const truncate =require ('./truncate')
chai.use(chaiHttp)
describe('Review',()=>{
    /**
     * don't need this since we have a pre-post hooks
     */
    // beforeEach(()=>{
    //     // ** it should remove contents before running the test
    //    //await truncate()
       
    //    console.log('deleted i think')
    // })
    it('should create a new Restaurant', (done)=>{
        chai.request(app)
        .post('/restaurant/create')
        .send({
            "name":"kategna","phoneNumber": 0911123456,
             "webSite": "kategna.et", "email": "kategna@gmail.com", "foodQuality":1,
            "longitude": 25.65, "latitude":39.87, "relativeLocation":"Near Bole millenium hall",
            "cusine": "maheberawi"
        }).end((err,res)=>{
            console.log(res.body)
            // console.log(err)
              res.body.should.have.property('name')
              res.body.should.have.property('phoneNumber')
              res.body.should.have.property('email')
              res.body.should.have.property('LocationId')
            //  res.body.should.have.property('UserId')
            //  res.body.should.be.a('Object')
            //  res.should.have.status(200)
            done()
        })
    }) 
    /** 
     * create 2 tests that fails to create a resturant -1 with can't create a restaurant with duplicate name
     * -2 can't create a restaurant with an invalid email
     */

    it('should get a specific restaurants',(done)=>{
        chai.request(app)
        .get('/restaurant/getrestaurant/1')
        .end((err,res)=>{
            //console.log(app.config)
            console.log(res.body)
            res.body.should.be.a('Object')
            res.body.restaurant.should.be.a('Object')
            res.body.restaurant.should.have.property('name')
            res.body.restaurant.should.have.property('phoneNumber')
            res.body.restaurant.should.have.property('email')
            res.body.restaurant.should.have.property('Reviews')
            res.body.restaurant.should.have.property('Location')
            res.body.restaurant.should.have.property('Cusines')
            res.should.have.status(200)
            done()
        })
    })
    it('should fail to get a restaurant with a fake Id',(done)=>{
        chai.request(app)
        .get('/restaurant/getrestaurant/1sd')
        .end((err,res)=>{
            //console.log(app.config)
            console.log(res.body)
             res.body.should.be.a('Object')
            res.should.have.status(404)
            done()
        })
    })
    it('should to get details of a restaurant',(done)=>{
        chai.request(app)
        .get('/restaurant/getdetails/1')
        .end((err,res)=>{
            //console.log(app.config)
            console.log(res.body)
            res.body.restaurant.should.be.a('Object')
            res.body.restaurant.should.have.property('name')
            res.body.restaurant.should.have.property('phoneNumber')
            res.body.restaurant.should.have.property('email')
            res.body.restaurant.should.have.property('Location')
            res.should.have.status(200)
            done()
        })
    })
    // afterEach((done)=>{
    //     truncate();
    //     done()
    // }) 
})


