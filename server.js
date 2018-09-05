const express = require('express')
//const connection = require('./Config/db')
const Sequelize = require('sequelize')
const bodyParser = require('body-parser')
//const {commentRoute} = require('./routes/comment')
const {userRoute} = require('./routes/user')
const {reviewRoute} = require('./routes/review')
const {restaurantRoute} = require('./routes/restaurant')
const app = express()

//app.use('/comments',commentRoute);
app.use('/user',userRoute);
app.use('/reviews',reviewRoute);
app.use('/restaurant',restaurantRoute);
app.use(bodyParser.json())


app.listen(5000,()=>{
    console.log('welcome heheheheh')
})