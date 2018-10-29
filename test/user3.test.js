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
   
    it('should UPDATE firtsName and lastName of a USER ', (done)=>{
        chai.request(app)
        .patch('/user/update/1')
        .send({
            "updates":{
                "firstName": "New FirstName",
                "lastName": "NewLastName"
            }
        }).end((err,res)=>{
            console.log(res.body)
            res.body.should.have.property('updatedUser')
            res.body.updatedUser.should.have.property('firstName')
            res.body.updatedUser.should.have.property('lastName')
            res.body.updatedUser.should.have.property('userName')
            res.body.updatedUser.should.have.property('email')
            res.body.updatedUser.should.be.a('Object')
             res.should.have.status(200)
            done()
        })
    })
    it('should FAIL to UPDATE a USER with an invalid email format ', (done)=>{
        chai.request(app)
        .patch('/user/update/1')
        .send({
            "updates":{
               "email": "wwtryhd"
            }
        }).end((err,res)=>{
            console.log(res.body)
            res.body.should.have.property('errors')
             res.body.errors[0].should.have.property('message')
             res.body.errors.should.be.a('Array')
            res.should.have.status(400)
            done()
        })
    })
    it('should FAIL to DELETE a USER with an invalid ID ', (done)=>{
        chai.request(app)
        .delete('/user/delete/1yer')
        .end((err,res)=>{
            console.log(res.body)
            res.body.should.be.a('Object')
            res.should.have.status(500)
            done()
        })
    })
    it('should DELETE a USER with a valid ID ', (done)=>{
        chai.request(app)
        .delete('/user/delete/1')
        .end((err,res)=>{
            console.log(res.body)
            res.body.should.have.property('user')
             res.body.should.be.a('Object')
             res.body.user.should.be.a('Number') //1 or 0
             res.should.have.status(200)
            done()
        })
    })
    // it('should Add a Resturant as Favourite Place ', (done)=>{
    //     chai.request(app)
    //     .get('/user/add/favourites/1/1')//ResturantId/UserId
    //     .end((err,res)=>{
    //         console.log(res.body)
    //          res.body.should.have.property('Message')
    //         res.body.should.be.a('Object')
    //         res.should.have.status(200)
    //         done()
    //     })
    // })
    // it('should Get the favourite place of a USER ', (done)=>{
    //     chai.request(app)
    //     .get('/user/favourites/1')//ResturantId/UserId
    //     .end((err,res)=>{
    //         console.log(res.body)
    //          res.body.should.have.property('Favourites')
    //          res.body.Favourites.should.be.a('Array')
    //          res.body.should.be.a('Object')
    //          res.should.have.status(200)
    //         done()
    //     })
    // })
    
    
    // afterEach((done)=>{
    //     truncate();
    //     done()
    // }) 
})


