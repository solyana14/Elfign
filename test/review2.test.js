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
    })
    it('should fail to create a new reveiw with out a body', (done)=>{
        chai.request(app)
        .post('/reviews/create/1/1')
        .send({
         "title": "this review has no body",  
        }).end((err,res)=>{
            console.log(res.body)
           // console.log(err)
             res.body.should.have.property('errors')
             res.body.errors[0].should.have.property('message')
             res.body.errors.should.be.a('Array')
             res.should.have.status(500)
            done()
        })
    }) 
    it('should fail to create a new Review with out a title', (done)=>{
        chai.request(app)
        .post('/reviews/create/1/1')
        .send({
         "body": "this review has no title",  
        }).end((err,res)=>{
            console.log(res.body)
           // console.log(err)
             res.body.should.have.property('errors')
             res.body.errors[0].should.have.property('message')
             res.body.errors.should.be.a('Array')
             res.should.have.status(500)
            done()
        })
    }) 
    it('should update a Review with a specific Id',(done)=>{
        chai.request(app)
        .patch('/reviews/update/1')
        .send({
            "updates":{
                "title": "the title has been updated",
                "body": "body toddaso"
            }
        })
        .end((err,res)=>{
            console.log(res.body)
            res.body.should.be.a('Object')
            res.body.updatedReview.should.be.a('Object') //1 or 0
            res.should.have.status(200)
            done()
        })
    })

    /**
     * the delete works uncomment when done with beforEach and afterEach hooks
     */
    // it('should delete a Review with a specific Id',(done)=>{
    //     chai.request(app)
    //     .delete('/reviews/delete/1')
    //     .end((err,res)=>{
    //         //console.log(res.body)
    //         res.body.should.be.a('Object')
    //          res.body.review.should.be.a('Number') //1 or 0
    //         done()
    //     })
    // })
    it('should fail to delete a Review with a wrong Id',(done)=>{
        chai.request(app)
        .delete('/reviews/delete/1yt')
        .end((err,res)=>{
            //console.log(app.config)
            console.log(res.body)
            res.body.should.be.a('Object')
            res.should.have.status(500)
            done()
        })
    })
    
    // // afterEach((done)=>{
    // //     truncate();
    // //     done()
    // // }) 
})


