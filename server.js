// Dependencies
var http = require("http");
var fs = require("fs");
var express = require("express");
var bodyParser = require("body-parser");
var path = require("path");

// Set our port to 8080 like I told Ron since last week!
// var portSwitch = process.argv[2];
// var PORTNODE = 8080;
var app = express();
var PORT = 3000;

// Create our server
var server = http.createServer(handleRequest);

// Start our server
server.listen(PORT, function() {
  // Callback triggered when server is successfully listening. Hurray!
  console.log("Server listening on: http://localhost:" + PORT);
});

// Create a function which handles incoming requests and sends responses
function handleRequest(req, res) {

    // Capture the url the request is made to
  var path = req.url;
    
    // Depending on the URL, display a different HTML file.
  switch (path) {

  case "/":
    return displayRoot(path, req, res);
      
  case "/tables":
    return displayTables(path, req, res);
    
  case "/reserve":
    return displayReservations(path, req, res);
  
  default:
    return display404(path, req, res);
  }
};

// When someone visits the "http://localhost:8080/" path, this function is run.
function displayRoot(url, req, res) {
        fs.readFile(__dirname + "/index.html", function(err, data) {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(data);
      });
  };

// When someone visits the "http://localhost:8080/favorite_foods" path, this function is run.
function displayTables(url, req, res) {
        fs.readFile(__dirname + "/tables.html", function(err, data) {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(data);
      });
  };

// When someone visits the "http://localhost:8080/favorite_movies" path, this function is run.
function displayReservations(url, req, res) {
        fs.readFile(__dirname + "/reserve.html", function(err, data) {
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(data);
      });
  };

// When someone visits any path that is not specifically defined, this function is run.
function display404(url, req, res) {
  var myHTMLERROR = "<html>" +
    "<body><h1>404 Not Found </h1>" +
    "<p>The page you were looking for: " + url + " can not be found</p>" +
    "</body></html>";

  // Configure the response to return a status code of 404 (meaning the page/resource asked for couldn't be found), and to be an HTML document
  res.writeHead(404, { "Content-Type": "text/html" });

  // End the response by sending the client the myHTML string (which gets rendered as an HTML document thanks to the code above)
  res.end(myHTMLERROR);
  };

  // Table Reservations (DATA)
// =============================================================
var tableReservations = [
  {
    Name: "yoda",
    Phone_Number: 916-555-5555,
    E_Mail: "Jedi_Master@gmail.com",
    ID: 900,
  },
  {
    Name: "Louie",
    Phone_Number: 916-444-4444,
    E_Mail: "Jedi_Soldier@gmail.com",
    ID: 800,
  },
  {
    Name: "Max",
    Phone_Number: 916-333-3333,
    E_Mail: "Jedi_Servant@gmail.com",
    ID: 700,
  }
];

// Routes
// =============================================================

// Basic route that sends the user first to the AJAX Page
app.get("/", function(req, res) {
  // res.send("Welcome to the Star Wars Page!")
  res.sendFile(path.join(__dirname, "index.html"));
});

// Displays all characters
app.get("/tableReservations", function(req, res) {
  return res.json(tableReservations);
});

// Displays a single character, or returns false
app.get("/tableReservations/:newReservation", function(req, res) {
  var reserve = req.params.newReservation;

  console.log(chosen);

  for (var i = 0; i < tableReservations.length; i++) {
    if (reserve === tableReservations[i].routeName) {
      return res.json(tableReservations[i]);
    }
  }

  return res.json(false);
});

// Create New Characters - takes in JSON input
app.post("/api/tableReservations", function(req, res) {
  // req.body hosts is equal to the JSON post sent from the user
  // This works because of our body-parser middleware
  var newReservation = req.body;

  console.log(newReservation);

  // We then add the json the user sent to the character array
  tableReservations.push(newReservation);

  // We then display the JSON to the users
  res.json(newReservation);
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
