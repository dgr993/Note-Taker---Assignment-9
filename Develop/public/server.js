var fs = require("fs");
var myJson = {
    key: "myvalue"
};

fs.writeFile( "db.json", JSON.stringify( myJson ), "utf8", yourCallback );

myJson = require("./filename.json");

var express = require("express");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get("/notes", function(req, res) {
    res.sendFile(path.join(__dirname, "notes.html"));
  });
  
  app.get("*", function(req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
  });

// API's
  app.get("/api/notes", function(req, res) {

    return res.json(notes);
  });

  app.get("/api/notes:id", function(req, res) {
    return res.json(characters);
  });