var dateformat = require('dateformat');
function register(req, res, connection){
    var model = req.query.model;
    var api = req.query.api;
    var subdate = dateformat(new Date(), 'yyyy-mm-d');
    
             // Insert new user
             connection.query("INSERT INTO app_users SET ?",{
                model:model,
                api:api,
                subdate:subdate,
             },function(error, result){

                if(error)
                console.log(error);
                return res.json({userid:result.insertId});
             });
}
module.exports = register;