const express = require("express");
const mysql   = require("mysql");
const bodyParser  = require("body-parser");
const morgan = require('morgan')
const rest = require("./REST.js");

const app  = express();

const REST = () => {
  this.connectMysql();
};

app.all('/*', (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
  res.header("Access-Control-Allow-Headers", "X-Requested-With, Content-Type");
  next();
});

REST.prototype.connectMysql = () => {
  const pool      =    mysql.createPool({
    connectionLimit : 100, //the number of pre-load connection.
    host     : '', // host of your mySql.
    user     : '', // user of your mySql.
    password : '', // Password of your mySql.
    port     : '', // Port of your mySql.
    database : '', // Name of yout database in mySql.
    // socketPath:  "/Applications/MAMP/tmp/mysql/mysql.sock", //if you have a socketPath.
    debug    :  false
  });
  pool.getConnection((err,connection) => {
    if(err) {
      this.stop(err);
    } else {
      this.configureExpress(connection);
    }
  });
};

REST.prototype.configureExpress = (connection) => {
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(bodyParser.json());
    app.use(morgan('tiny'))
    const router = express.Router();
    app.use('/api', router);
    const rest_router = new rest(router,connection);
    this.startServer();
}

REST.prototype.startServer = () => {
    app.listen(3000, () => {
        console.log("All right my friend, sky is the limit ! enjoy !");
    });
};

REST.prototype.stop = (err) => {
    console.log("ISSUE WITH MYSQL n" + err);
    process.exit(1);
};

new REST();
