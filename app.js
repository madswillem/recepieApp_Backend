const express = require('express')
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser');
require('dotenv/config')
const Recepie = require('./models/Recepie')

const app = express();

app.use(express.json())
app.use(cookieParser());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Headers', 'Origin, X-Request-With, Content-Type, Accept, Authorization')

    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', 'PUT, POST, PATCH, DELTE, GET')
        return res.status(200).json({});
    }
    next();
})

//IMPORT ROUTES
const postsRoute = require('./routes/posts')

app.use('/api', postsRoute)

//ROUTES
app.get('/', (req, res) => {
    res.send('Hello World')
})

//CONNECT TO DB
try{
    mongoose.connect(process.env.DB_CONNECTION, () => console.log('conected to db'));
}catch(err){
    console.log(err)
}

//LISTEN
app.listen(5000);