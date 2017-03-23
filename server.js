var express = require("express");
var mysql   = require("mysql");
var bodyParser  = require("body-parser");
var rest = require("./REST.js");
var app  = express();
var morgan = require('morgan')



function REST(){
    var self = this;
    self.connectMysql();
};

app.all('/*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
    res.header("Access-Control-Allow-Headers", "X-Requested-With,     Content-Type");
    next();
});



REST.prototype.connectMysql = function() {
    var self = this;
    var pool      =    mysql.createPool({
        connectionLimit : 100, //the number of pre-load connection.
        host     : '', // host of your mySql.
        user     : '', // user of your mySql.
        password : '', // Password of your mySql.
        port : '', // Port of your mySql.
        database : '', // Name of yout database in mySql.
        // socketPath:  "/Applications/MAMP/tmp/mysql/mysql.sock", //if you have a socketPath.
        debug    :  false
    });
    pool.getConnection(function(err,connection){
        if(err) {
          self.stop(err);
        } else {
          self.configureExpress(connection);
        }
    });
}

REST.prototype.configureExpress = function(connection) {
      var self = this;
//      app.use(morgan('dev'));
      app.use(bodyParser.urlencoded({ extended: true }));
      app.use(bodyParser.json());
      app.use(morgan('tiny'))
      var router = express.Router();
      app.use('/api', router);
      var rest_router = new rest(router,connection);
      self.startServer();
}

REST.prototype.startServer = function() {
      app.listen(3000,function(){
          console.log("All right my friend, sky is the limit ! enjoy !");
      });
}

REST.prototype.stop = function(err) {
    console.log("ISSUE WITH MYSQL n" + err);
    process.exit(1);
}

new REST();