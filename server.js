const express = require('express')
const mongoose = require('mongoose')
const requireDir = require('require-dir')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express();


requireDir('./src/models')

mongoose.connect(
    'mongodb+srv://deploy:tafelli0104@cluster0-dxxwd.gcp.mongodb.net/factory-api?retryWrites=true&w=majority',
    { 
        useNewUrlParser: true,
        useUnifiedTopology: true
    }
)

app.use(cors())
app.use(bodyParser.json())
app.use('/api', require('./src/routes'));
app.listen(8080)