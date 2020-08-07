var fs = require("fs");
var myJson = require("./db/db.json")
let notes = [{

}]

fs.writeFile("db/db.json", JSON.stringify(myJson), function (err) {
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


app.get("/notes", function (req, res) {
  res.sendFile(path.join(__dirname, "/public/notes.html"));
});

app.get("/assets/js/index.js", function (req, res) {
  res.sendFile(path.join(__dirname, "/public/assets/js/index.js"));
});

app.get("/assets/css/styles.css", function (req, res) {
  res.sendFile(path.join(__dirname, "/public/assets/css/styles.css"));
});

// API's
app.get("/api/notes", function (req, res) {
  fs.readFile(__dirname + "/db/db.json", function (err, data) {
    if (err) throw err;
    let notes = JSON.parse(data);
    return res.json(notes);
  })
});


app.post("/api/notes", function (req, res) {

  fs.readFile(__dirname + "/db/db.json", function (err, data) {
    if (err) throw err;
    let notes = JSON.parse(data);
    var newNote = req.body;
    newNote.id = newNote.title;
    notes.push(newNote);

    fs.writeFile(__dirname + "/db/db.json", JSON.stringify(notes), function (err, data) {
    if (err) throw err;
    console.log(newNote);
    res.json(newNote);
    })
  })
});

app.delete("/api/notes/:id", function (req, res) {
  var notesID = req.params.id;
  fs.readFile(__dirname + "/db/db.json", function (err, data) {
    if (err) throw err;
    let notes = JSON.parse(data);
    var newNote = req.body;
    console.log(notes);

  for (var i = 0; i < notes.length; i++) {
    if (notesID === notes[i].text) {
      let newNote = notes.splice(i, 1) 
      fs.writeFile(__dirname + "/db/db.json", JSON.stringify(notes), function (err, data) {
        if (err) throw err;
        console.log(newNote);
        res.json(newNote);
        })
      return res.json(notes[i]);
    }
  }
})

  return res.json(false);
});

app.get("*", function (req, res) {
  res.sendFile(path.join(__dirname, "public/index.html"));
});

app.listen(PORT, function () {
  console.log("App listening on PORT " + PORT);
});