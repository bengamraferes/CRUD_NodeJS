var mysql = require('mysql');
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    database : 'monentreprise'
  });
  connection.connect();
  
  class Employees {
      
    
      static  readAll (cb) {
        connection.query('SELECT * FROM `employees` ', function (error, results) {
            if (error) throw error;
            cb(results);
          })
      } 
      static read(id,cb){
          connection.query('SELECT * FROM `employees` WHERE id = ?',[id],function(error,results){
            if (error) throw error;
            cb(results);
          })
      }
      static update(tabInfo,cb){
          connection.query('UPDATE `employees` SET `firstname`= ?,`lastname`= ? ,`email`= ? ,`post`= ? ,`salary`= ?  WHERE id = ? ',tabInfo,function(error,results){
            if (error) throw error;
            cb(results);
          })
      }
      static delete(id,cb){
          connection.query('DELETE FROM `employees` WHERE id = ?', [id], function(error,results){
            if (error) throw error;
            cb(results);
          })
      }
      static create(tabInfo,cb){
          connection.query('INSERT INTO `employees`(`id`, `firstname`, `lastname`, `email`, `post`, `salary`, `hiring_date`) VALUES ( NULL , ? ,? ,?, ? ,?,?)',tabInfo,function(error,results){
            if (error) throw error;
            cb(results);
          })
      }
  }
  module.exports = Employees;