// declearations
const express = require("express");
const mysql = require("mysql2");
const bodyparser = require("body-parser");
const e = require("express");

const app = express();
// assigning body parser
app.use(bodyparser.json());
const port = 4040;
// initialising the serve
app.listen(port);
console.log("server initialised");

// connection to database.
const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "college",
  port: 4306,
});

// connection verifications
db.connect((err) => {
  if (err) {
    console.log(err);
  } else {
    console.log("db connected");
  }
});

// Getting a data from the database

app.get("/std/:id", (req, res) => {
  let id = req.params.id;
  let qry = 'SELECT * FROM marklist WHERE std_id = " ' + id + '"';
  db.query(qry, (err, results) => {
    if (err) {
      console.log(err);
    }
    if (results.length > 0) {
      res.send({ status: true, msg: "success", data: results });
    } else {
      res.send({ status: false, msg: "error" });
    }
  });
});

// inserting a new data into the database

app.put("/std/add", (req, res) => {
  let name = req.body.name;
  let lang = req.body.lang;
  let maths = req.body.maths;
  let science = req.body.science;
  let social = req.body.social;

  let qry =
    "INSERT INTO marklist(name, lang, maths, science, social) VALUES ('" +
    name +
    "','" +
    lang +
    "','" +
    maths +
    "','" +
    science +
    "','" +
    social +
    "')";
  console.log(qry);
  db.query(qry, function (err, result) {
    if (err) {
      res.send(err);
    }
    if (result.affectedRows > 0) {
      res.send({ status: true, msg: "success", data: result });
    } else {
      res.send({ status: false, msg: "error" });
    }
  });
});

// posting an update into the database
app.post("/std/up",(req, res)=>{
    let id = req.body.id;
    let qry = "UPDATE marklist SET social= 80 WHERE std_id='"+ id +"'";
    console.log(qry);
    db.query(qry, function(err,result){
        if(err){
            res.send(err);
        }
        if (result.affectedRows> 0){
            res.send({ status: true, msg: "success", data: result});
        }
        else{
            res.send({ status: false, msg: "error"});
        }
    })

})
// deleting a record from the database
app.delete("/std/dlt",(req, res)=>{
    let id = req.body.id;
    let qry = 'DELETE from marklist WHERE std_id = " '+ id +'"';
    db.query(qry, function(err, result) {
        if(err){
            res.send(err);
        }
        if(result.affectedRows> 0){
            res.send({ status: true, msg: "success", data: result});
        }
        else{
            res.send({ status: false, msg: "error"})
        }
    })
})
