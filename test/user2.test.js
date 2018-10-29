const chai = require('chai');
const chaiHttp = require('chai-http');
const userRoute=require('../routes/user')
const should = chai.should()
const {app} = require('../server')
chai.use(chaiHttp)
describe('User',()=>{
    /**
     * don't need this since we have a pre-post hooks
     */
    // beforeEach(()=>{
    // })
    it('should FAIL to SIGNUP a USER without a LastName ', (done)=>{
        chai.request(app)
        .post('/user/signup')
        .send({
            "lastName": "User",
            "userName": "user144234",
            "email":"user@gmail.com"
        }).end((err,res)=>{
            console.log(res.body)
            res.body.should.have.property('errors')
             res.body.errors[0].should.have.property('message')
             res.body.errors.should.be.a('Array')
            res.should.have.status(400)
            done()
        })
    })
    // it('should GET the past Reviews of a USER', (done)=>{
    //     chai.request(app)
    //     .post('/review/create/1/1')
    //     .send({
    //         "body":"test a body", "title": "test title!!",
    //          "wifi": 10, "cleanliness": 10, "foodQuality":8,
    //         "service": 10, "location":9, "parking":7
    //     })
    //     .get('/user/getreview/1')
    //     .end((err,res)=>{
    //         console.log(res.body)
    //         // res.body.should.have.property('errors')
    //         //  res.body.errors[0].should.have.property('message')
    //         //  res.body.errors.should.be.a('Array')
    //         // res.should.have.status(400)
    //         done()
    //     })
    // })
    it('should GET the details/profile of a USER ', (done)=>{
        chai.request(app)
        .get('/user/profile/1')
        .end((err,res)=>{
            console.log(res.body)
            // res.body.should.have.property('errors')
            //  res.body.errors[0].should.have.property('message')
            //  res.body.errors.should.be.a('Array')
            // res.should.have.status(400)
            done()
        })
    })
    it('should Add a Resturant as Favourite Place ', (done)=>{
        chai.request(app)
        .get('/user/add/favourites/1/1')//ResturantId/UserId
        .end((err,res)=>{
            console.log(res.body)
             res.body.should.have.property('Message')
            res.body.should.be.a('Object')
            res.should.have.status(200)
            done()
        })
    })
    it('like or mark a review as helpful',(done)=>{
        chai.request(app)
        .get('/user/like/1/1') // /:ReviewId/:UserId
        .end((err,res)=>{
            console.log(res.body)
            done()
        })
    })
    it('should Get the favourite place of a USER ', (done)=>{
        chai.request(app)
        .get('/user/favourites/1')//ResturantId/UserId
        .end((err,res)=>{
            console.log(res.body)
             res.body.should.have.property('Favourites')
             res.body.Favourites.should.be.a('Array')
             res.body.should.be.a('Object')
             res.should.have.status(200)
            done()
        })
    })
    
    
    // afterEach((done)=>{
    //     truncate();
    //     done()
    // }) 
})


