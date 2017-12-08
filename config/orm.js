var ormCon = require("./connection.js");
var connection = require("./connection.js");

// Object Relational Mapper (ORM)

var orm = {
  select: function(tableInput, cb) {
    var queryString = "SELECT * FROM ??";
    connection.query(queryString, [tableInput], function(err, result) {
      cb(result);
    });
  }


};

module.exports = orm;