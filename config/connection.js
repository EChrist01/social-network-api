const { connect, connection } = require("mongoose");

connect("mongodb://localhost:27017/userThoughts");

module.exports = connection;