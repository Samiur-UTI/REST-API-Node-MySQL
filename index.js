const express = require("express");
const mysql      = require('mysql');
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json({limit:"30mb", extended:true}));
app.use(bodyParser.urlencoded({limit:"30mb", extended:true}));
app.set("view engine", "ejs");
const connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : "",
  database : "nodemysql"
});
// connection.query(q, [data] ,function(error,results,fields){
//     if(error) throw error;
//     console.log(results);
// });
app.get("/", function(req,res){
    const q = 'SELECT * FROM `todos`';
    const data = connection.query(q, (err,results,fields) => {
      if(err) console.log(err);
      return fields;
    })
    console.log(data);
    res.render("index");
})
app.post("/", async function(req,res){
    const data = await req.body.prename;
    const q = `INSERT INTO todos(text) VALUES("${data}")`;
    connection.query(q, (err,results,fields) => {
      if(err) console.log(err);
      res.redirect("/");
    })
})
app.listen(3000, () => console.log("Server is running"));
