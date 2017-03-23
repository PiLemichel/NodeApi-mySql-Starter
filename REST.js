var bcrypt = require('bcrypt');
var mysql   = require("mysql");



function REST_ROUTER(router,connection) {
    var self = this;
    self.handleRoutes(router,connection);
}

REST_ROUTER.prototype.handleRoutes= function(router,connection) {

//*****************
//*     users     *
//*****************
router.get("/users", function(req,res){
    var query = "SELECT * FROM ??";
    var table = ["users"];
    query = mysql.format(query,table);
    connection.query(query,function(err,rows){
        if(err) {
            res.json({"Error" : true, "Message" : "Error executing MySQL query"});
        } else {
            res.json(rows);
        }
    });
});

router.post("/users",function(req,res){
    var query = "INSERT INTO ?? (??,??,??,??,??,??) VALUES (?,?,?,?,?,?)";
    var table = ["users","id_groups","email","password","lastname","firstname","isActive",req.body.id_groups,req.body.email, req.body.password,req.body.lastname,req.body.firstname,req.body.isActive];
    query = mysql.format(query,table);
    connection.query(query,function(err,rows){
        if(err) {
            res.json({"Error" : true, "Message" : "Error executing MySQL query"});
        } else {
            res.json({"Error" : false, "Message" : "User Added !"});
        }
    });
});

router.get("/protected/users/:id",function(req,res){
    var query = "SELECT * FROM ?? WHERE ??=?";
    var table = ["users","id",req.params.id];
    query = mysql.format(query,table);
    connection.query(query,function(err,rows){
        if(err) {
            res.json({"Error" : true, "Message" : "Error executing MySQL query"});
        } else {
            res.json(rows[0]);
        }
    });
});

router.put("/users/:id",function(req,res){
    var query = "UPDATE users SET id_groups = ?,email = ?, lastname = ?, firstname = ?, isActive = ?  WHERE id = ?";
    var table = [req.body.id_groups, req.body.email,req.body.lastname,req.body.firstname,req.body.isActive, req.params.id];

    query = mysql.format(query,table);
    connection.query(query,function(err,rows){
        if(err) {
            res.json({"Error" : true, "Message" : "Error executing MySQL query"});
        } else {
            res.json({"Error" : false, "Message" : "User Updated "});
        }
    });
});


router.delete("/protected/users/:id",function(req,res){
    var query = "DELETE from ?? WHERE ??=?";
    var table = ["users","id",req.params.id];
    query = mysql.format(query,table);
    connection.query(query,function(err,rows){
        if(err) {
            res.json({"Error" : true, "Message" : "Error executing MySQL query"});
        } else {
            res.json({"Error" : false, "Message" : "user with id "+req.params.id+" was deleted"});
        }
    });
});
}
module.exports = REST_ROUTER;