var express = require('express');
var path = require('path');
var fs = require("fs");
var file = "test2.db";
var exists = fs.existsSync(file);

var app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

if(!exists) {
    console.log("Creating DB file.");
    fs.openSync(file, "w");
}

var sqlite3 = require("sqlite3").verbose();
var db = new sqlite3.Database(file);

db.serialize(function() {
    if(!exists) {
        db.run("CREATE TABLE Stuff (thing TEXT)");
    }

    db.run("insert into Stuff values(1)");


    var stmt = db.prepare("UPDATE Stuff SET thing = ? ");

//Insert random data
    var rnd=1;
    rnd++;
    stmt.run("Thing #" + rnd);

    stmt.finalize();
    db.all("SELECT * FROM Stuff", function(err, res) {
    if(!err)
        //count = res.length;
        console.log(res.le);
    else
        console.log(err);
    });
});

db.close();


app.get('/', function(req, res, next) {
    res.render('index', { title: 'Express' ,count:"刷新次数:" + res.length});
});