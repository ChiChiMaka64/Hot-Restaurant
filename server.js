// Dependencies
var http = require("http");
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");
var fs = require("fs");


// Other variables
var appendReservation;


// Sets up the Express App
var app = express();
var PORT = 3000;


// Create our server
var server = http.createServer(handleRequest);


// Star Wars Characters (DATA)
var reservations = [
    {
        routeName: "yoda",
        name: "Yoda",
        role: "Jedi Master",
        age: 900,
        forcePoints: 2000
    }
];


// Sets up the Express app to handle data parsing (middleware)
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


// Create a function for handling the requests and responses coming into our server
// function handleRequest(req, res) {
//     var path = req.url;
//     switch (path) {

//         case "/":
//             return displayRoot(path, req, res);

//         case "/cssframeworks":
//             return displayCSS(path, req, res);

//         default:
//             return display404(path, req, res);
//     }
// };


// Basic routes
app.get("/", function (req, res) {
    res.sendFile(path.join(__dirname, "home.html"));
});

app.get("/tables", function (req, res) {
    res.sendFile(path.join(__dirname, "tables.html"));
});

app.get("/reserve", function (req, res) {
    res.sendFile(path.join(__dirname, "reserve.html"));
});


app.post("/api/characters", function (req, res) {
    var newcharacter = req.body;
    // Using a RegEx Pattern to remove spaces from newCharacter
    newcharacter.routeName = newcharacter.name.replace(/\s+/g, "").toLowerCase();

    console.log(newcharacter);

    characters.push(newcharacter);

    res.json(newcharacter);
});


// fs.appendFile("res.txt", appendReservation, function (err) {
//     // If an error was experienced we will log it.
//     if (err) {
//         console.log(err);
//     }
//     // If no error is experienced, we'll log the phrase "Content Added" to our node console.
//     else {
//         console.log("Content Added!");
//     }
// });






// Starts the server to begin listening
app.listen(PORT, function () {
    console.log("App listening on: http://localhost:" + PORT);
});