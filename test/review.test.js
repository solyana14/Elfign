//let env = process.env.NODE_ENV
//let env = process.env.NDOE_ENV='test'
//let config = require('./../config/config.json')['test']
//let db = require('../models/index')
//console.log(db.sequelize)
//console.log(config)
//console.log(env)

//process.env.NODE_ENV='test'
const chai = require('chai');
const chaiHttp = require('chai-http');
const Review = require('../models').Review;
const reviewRoute=require('../routes/review')
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
    it('should create a new reveiw for a specific restaurant', (done)=>{
        chai.request(app)
        .post('/reviews/create/1/1')
        .send({
            "body":"Mami has the best kitfo in the world", "title": "best place ever!!",
             "wifi": 10, "cleanliness": 1, "foodQuality":1,
            "service": 10, "location":9, "parking":7
        }).end((err,res)=>{
            console.log(res.body)
            console.log(err)
             res.body.should.have.property('title')
             res.body.should.have.property('body')
             res.body.should.have.property('RestaurantId')
             res.body.should.have.property('RatingId')
             res.body.should.have.property('UserId')
             res.body.should.be.a('Object')
             res.should.have.status(200)
            done()
        })
    }) 
    it('should get all the reviews',(done)=>{
        chai.request(app)
        .get('/reviews/getreview/1')
        .end((err,res)=>{
            //console.log(app.config)
            console.log(res.body.reviews)
            res.body.should.be.a('Object')
             res.body.reviews.should.be.a('Array')
            res.body.reviews[0].should.have.property('title')
            res.body.reviews[0].should.have.property('body')
            res.body.reviews[0].should.have.property('Restaurant')
            res.body.reviews[0].should.have.property('Reviewer')
            res.body.reviews[0].should.be.a('Object')
            res.should.have.status(200)
            done()
        })
    })
    it('should get a specific reviews',(done)=>{
        chai.request(app)
        .get('/reviews/getreview/1/1')//firts params is restaurantId ,second reviewId
        .end((err,res)=>{
            console.log(res.body)
              res.body.should.be.a('Object')
              res.body.review.should.be.a('Object')// ***this should be an object 
              res.body.review.should.have.property('title')
             res.body.review.should.have.property('body')
              res.body.review.should.have.property('Restaurant')
              res.body.review.should.have.property('Reviewer')
            // //res.body[0].review.should.have.property('body')
            //  res.should.have.status(200)
            console.log(res.body)
            done()
        })
    })
    
    // afterEach((done)=>{
    //     truncate();
    //     done()
    // }) 
})


