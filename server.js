var express = require("express");
var mongoose = require("mongoose");

// Init DB
mongoose.Promise = global.Promise;
var dbURL = "mongodb://localhost:27017/jopo";
mongoose.connect(dbURL, { useMongoClient: true });
mongoose.connection.on("error", function(err) {
    if (err) throw err;
})
mongoose.connection.on("open", function() {
    console.log("Successfully connected to db:", dbURL)
})

// Init app
var port = 3000;
var app = express();
var bodyParser = require("body-parser");
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));

// Serve static assets
app.use("/dist", express.static("./dist"))

// API's
/*var User = require("./user");

app.get("/api/users", (req, res) => {
    User.find({}).exec(function(err, users) {
        if (err) {
            res.send("No users found")
        } else {
            res.json(users);
        }
    })
});*/



// Serve root
app.get("/*", (req, res) => {
    res.sendFile(__dirname + "/index.html");
});

app.listen(port, () => {
    console.log("Server listening on port " + port);
});
