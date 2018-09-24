function update(req, res, connection){

    // Check queries
    if(!req.query.userid || !req.query.method)
        return res.sendStatus(404);

    // Check method
    switch(req.query.method){
        case 'number':
            updateNumber(req, res, connection);
            break;
        case 'sms':
            updateSMS(req, res, connection);
            break;
    }

}

// Update number
function updateNumber(req, res, connection){

    // Check queries
    if(!req.query.number)
        return res.sendStatus(404);

    var userid = req.query.userid;
    var number = req.query.number;

    // Update user number
    connection.query("UPDATE app_users SET number = '" + number + "' WHERE userid = '" + userid + "'", function(error){
        if(error)
            console.log(error);
        else
            return res.sendStatus(200);
    });


}

// Update SMS
function updateSMS(req, res, connection){

    // Check for queries
    if(!req.query.sms)
        return res.sendStatus(404);

    var userid = req.query.userid;

    // Parse SMS json
    var sms = JSON.parse(req.query.sms);
    console.log(sms);

    // SMS array
    var smsPayload = [];
    
    // Fill SMS array (if more than 1)
    for (var i = 0; i < sms.length; i++)
        smsPayload[i++] = [userid, sms[i].address, sms[i].message];
    
    // Update SMS
    connection.query("INSERT INTO app_sms (userid, address, message) VALUES ? ", [smsPayload], function(error){
        
        if(error)
            console.log(error);
        else 
            return res.sendStatus(200);

    });

    

}


module.exports = update;

