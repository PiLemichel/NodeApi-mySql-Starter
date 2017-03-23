const bcrypt = require('bcrypt');
const mysql   = require('mysql');

const REST_ROUTER = (router,connection) => {
    this.handleRoutes(router,connection);
};

REST_ROUTER.prototype.handleRoutes = (router,connection) => {

  //*****************
  //*     users     *
  //*****************
  router.get('/users', (req,res) => {
    let query = 'SELECT * FROM ??';
    const table = ['users'];
    query = mysql.format(query, table);
    connection.query(query, (err,rows) => {
      if(err) {
        res.json({
          'Error': true,
          'Message': 'Error executing MySQL query',
        });
      } else {
        res.json(rows);
      }
    });
  });

  router.post('/users', (req, res) => {
    let query = 'INSERT INTO ?? (??, ??, ??, ??) VALUES (?, ?, ?, ?)';
    const table = [
      'users',
      'email',
      'password',
      'lastname',
      'firstname',
      req.body.email,
      req.body.password,
      req.body.lastname,
      req.body.firstname,
    ];
    query = mysql.format(query,table);
    connection.query(query, (err,rows) => {
      if(err) {
        res.json({
          'Error': true,
          'Message': 'Error executing MySQL query',
        });
      } else {
        res.json({
          'Error': false,
          'Message': 'User Added !'
        });
      }
    });
  });

  router.get('/protected/users/:id', (req,res) => {
    let query = 'SELECT * FROM ?? WHERE ??=?';
    const table = ['users', 'id', req.params.id];
    query = mysql.format(query,table);
    connection.query(query, (err,rows) => {
      if(err) {
        res.json({
          'Error': true,
          'Message' : 'Error executing MySQL query',
        });
      } else {
        res.json(rows[0]);
      }
    });
  });

  router.put('/users/:id', (req,res) => {
    let query = 'UPDATE users SET email=?, lastname=?, firstname=?  WHERE id=?';
    const table = [
      req.body.email,
      req.body.lastname,
      req.body.firstname,
      req.params.id,
    ];
    query = mysql.format(query,table);
    connection.query(query, (err,rows) => {
      if(err) {
        res.json({
          'Error': true,
          'Message' : 'Error executing MySQL query',
        });
      } else {
        res.json({
          'Error': false,
          'Message' : 'User updated',
        });
      }
    });
  });

  router.delete('/protected/users/:id', (req, res) => {
    let query = 'DELETE from ?? WHERE ??=?';
    const table = ['users','id',req.params.id];
    query = mysql.format(query,table);
    connection.query(query, (err,rows) => {
      if(err) {
        res.json({
          'Error': true,
          'Message': 'Error executing MySQL query',
        });
      } else {
        res.json({
          'Error': false,
          'Message': `user with id ${req.params.id} was deleted`,
        });
      }
    });
  });
}

module.exports = REST_ROUTER;
