const express = require('express')
//const connection = require('./Config/db')
const Sequelize = require('sequelize')
const bodyParser = require('body-parser')
//const {commentRoute} = require('./routes/comment')
const {userRoute} = require('./routes/user')
const {reviewRoute} = require('./routes/review')
const {restaurantRoute} = require('./routes/restaurant')
const app = express()
const db = require('./models')
//console.log()
//app.use('/comments',commentRoute);
app.use('/user',userRoute);
app.use('/reviews',reviewRoute);
app.use('/restaurant',restaurantRoute);
app.use(bodyParser.json())

let PORT = process.env.PORT
app.listen(PORT,()=>{
    console.log(`Server started on port ${PORT}`)
})

module.exports ={app}