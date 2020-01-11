const express = require('express')
const mongoose = require('mongoose')
const requireDir = require('require-dir')
const cors = require('cors')
const app = express();

// mongoose.connect(
//     'mongodb://localhost:27017/factory-api',
//     { 
//         useNewUrlParser: true,
//         useUnifiedTopology: true
//     }
// )

app.use(cors())
app.use('/api', require('./src/routes'));
app.listen(8080)