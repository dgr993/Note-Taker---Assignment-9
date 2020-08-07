var fs = require("fs");
var myJson = require("./db/db.json")
let notes = []
fs.writeFile( "db/db.json", JSON.stringify( myJson ), function (err) {
  if (err) throw err;
  console.log('Saved!');
});

var express = require("express");
var path = require("path");
const { json } = require("express");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());


app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "/public/notes.html"));
  });


// // API's
//   app.get("/api/notes", function(req, res) {
//     fs.readFile(__dirname + "./db/db.json", function(err, data) {
//       if (err) throw err;
//       res.end(data);
//       let notes = JSON.parse(data);
//       return res.json(notes);
//   });

  app.post("/api/notes", function(req, res) {
    var newNote = req.body;
    console.log(newNote);
    notes.push(newNote);
    res.json(newNote);
  });

  app.get("/api/notes:id", function(req, res) {
    return res.json(characters);
  });

  app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "public/index.html"));
  });

  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });