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
    it('should SIGNUP a New USER ', (done)=>{
        chai.request(app)
        .post('/user/signup')
        .send({
            "firstName":"tewedaj",
            "lastName": "missale",
            "userName": "tewedaj123",
            "email":"tewedaj@gmail.com"
        }).end((err,res)=>{
            console.log(res.body)
           // console.log(err)
             res.body.should.have.property('firstName')
             res.body.should.have.property('lastName')
             res.body.should.have.property('userName')
             res.body.should.have.property('email')
             res.body.should.be.a('Object')
            // res.should.have.status(200)
            done()
        })
    }) 
    it('should FAIL to SIGNUP a USER with a duplicate Email ', (done)=>{
        chai.request(app)
        .post('/user/signup')
        .send({
            "firstName":"New",
            "lastName": "User",
            "userName": "user1234",
            "email":"tewedaj@gmail.com"
        }).end((err,res)=>{
            console.log(res.body)
            res.body.should.have.property('errors')
             res.body.errors[0].should.have.property('message')
             res.body.errors.should.be.a('Array')
            res.should.have.status(400)
            done()
        })
    })
    it('should FAIL to SIGN a USER with a duplicate UserName ', (done)=>{
        chai.request(app)
        .post('/user/signup')
        .send({
            "firstName":"another",
            "lastName": "User2",
            "userName": "tewedaj123",
            "email":"anotheruser@gmail.com"
        }).end((err,res)=>{
            console.log(res.body)
            res.body.should.have.property('errors')
             res.body.errors[0].should.have.property('message')
             res.body.errors.should.be.a('Array')
            res.should.have.status(400)
            done()
        })
    })
    it('should FAIL to SIGNUP a USER with out FirtsName ', (done)=>{
        chai.request(app)
        .post('/user/signup')
        .send({
            "lastName": "User2",
            "userName": "tewedaj123",
            "email":"email@gmail.com"
        }).end((err,res)=>{
            console.log(res.body)
            res.body.should.have.property('errors')
             res.body.errors[0].should.have.property('message')
             res.body.errors.should.be.a('Array')
            res.should.have.status(400)
            done()
        })
    })
    
    
    // afterEach((done)=>{
    //     truncate();
    //     done()
    // }) 
})


