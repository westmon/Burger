var express = require("express");
var bodyParser = require("body-parser");
var connection = require("./config/connection.js");
var orm = require("./config/orm.js");
var app = express();
var PORT = process.env.PORT || 3000;
app.use(express.static("public"));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var exphbs = require("express-handlebars");

app.engine("handlebars", exphbs({ defaultLayout: "main" }));
app.set("view engine", "handlebars");



app.get("/", function(req, res) {

  orm.select("burgers", function(result) {
  var data = result;
  res.render("index", { burgers: data });

});

});

app.post("/burgers", function(req, res) {
  connection.query("INSERT INTO burgers (burger_name) VALUES (?)", [req.body.burger], function(err, result) {
    if (err) {
      return res.status(500).end();
    }

    // Send back the ID of the new todo
    res.json({ id: result.insertId });
    console.log({ id: result.insertId });
  });
});



// Retrieve all todos
app.get("/burgers", function(req, res) {
  orm.select("burgers", function(result) {
  var data = result;
  res.json(data);

  });
});

   app.put("/burgers/:id", function(req, res) {
  connection.query("UPDATE burgers SET devoured = true WHERE id = ?;", [req.params.id], function(err, result) {
    if (err) {
      // If an error occurred, send a generic server faliure
      return res.status(500).end();
    } else if (result.affectedRows == 0) {
      // If no rows were changed, then the ID must not exist, so 404
      return res.status(404).end();
    } else {
      res.status(200).end();
    }
  });
});



app.listen(PORT, function() {
  console.log("listening on port", PORT);
});