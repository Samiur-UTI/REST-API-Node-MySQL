const express = require("express");
const mysql      = require('mysql');
const app = express();
app.set("view engine", "ejs");
const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : "",
  database : "test"
});
connection.query(q, [data] ,function(error,results,fields){
    if(error) throw error;
    console.log(results);
});
connection.end();