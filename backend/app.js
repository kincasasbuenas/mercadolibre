// Requires
require('dotenv').config();
const argv = require('yargs').argv;
const express = require('express');
const bodyParser = require('body-parser');


// Express
const app = express();
app.set("env",  (process.env.ENVIROMENT || "dev") );
const port = process.env.PORT || 3003;

// CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
    next();
});


// Body Parser
// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())


// Routes
const appRoutes = require('./routes/app');
const routerApi = require('./routes/api');

app.use('/', appRoutes);
app.use('/api', routerApi);


// Listen PORT  
app.listen(port, () => {
    console.log(`Express server running in port ${port}: \x1b[32m%s\x1b[0m`, 'online');
});

