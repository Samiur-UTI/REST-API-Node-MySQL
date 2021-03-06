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
app.get("/", function(req,res){
    const q = 'SELECT * FROM `todos`';
    const data = connection.query(q, async (err,results,fields) => {
      if(err) throw (err);
      res.render("index", {data: await results});
    })
})
app.post("/", async function(req,res){
    const data = await req.body.prename;
    const q = `INSERT INTO todos(text) VALUES("${data}")`;
    connection.query(q, (err,results,fields) => {
      if(err) console.log(err);
      res.redirect("/");
    })
})
app.get("/:id/delete", function(req,res){
    const _id = req.params.id;
    const q = `DELETE FROM todos WHERE id = ${_id}`
    connection.query(q, (err,results,fields) => {
        if(err) throw (err);
        res.redirect("/");
    })
})
app.post("/:id/update", function(req,res){
    const _id = req.params.id;
    const data = JSON.stringify(req.body.update);
    const q = `UPDATE todos SET text = ${data} WHERE id= ${_id}`;
    connection.query(q, (err, results, fields) => {
        if(err) throw (err);
        res.redirect("/")
    })
})

app.listen(3000, () => console.log("Server is running"));
