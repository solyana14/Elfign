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
chai.use(chaiHttp)
describe('Review',()=>{
    beforeEach(()=>{

    })
    it('should get all the reviews',(done)=>{
        chai.request(app)
        .get('/reviews/getAll/1')
        .end((err,res)=>{
            console.log(app.config)
            //console.log(res.body.reviews[0])
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
             res.body.should.be.a('Object')
             res.body.review.should.be.a('Array')// ***this should be an object 
             res.body.review[0].should.have.property('title')
             res.body.review[0].should.have.property('body')
             res.body.review[0].should.be.a('Object')
             res.body.review[0].should.have.property('Restaurant')
             res.body.review[0].should.have.property('Reviewer')
            // res.body[0].review.should.have.property('body')
             res.should.have.status(200)
            done()
        })
    })
    // *** create a test for creating a new review
    // it('should create a new review',(done)=>{
    //     chai.request(app)
    //     .post('/create')
    //     .send({body:'this is a revieww body',
    //     title: 'title of Review',
    //     UserId:'1', 
    //     RestaurantId:'1'})///send the title and the book the postwith
    //     .end((err,res)=>{
    //         console.log(res.body,'kkkkkkkkk')
    //     })
    // })
})