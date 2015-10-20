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

db.serialize(function() {     //初始化应用创建db表,插入初始值
    if(!exists) {
        db.run("CREATE TABLE Stuff (count int,id int)");
        db.run("insert into Stuff values (0,1)");
    }
});

app.get('/', function(req, resp, next) {
    //查询 count值 计数自增
    db.all("SELECT * FROM Stuff", function(err, res) {
        if(!err) {
            var count = res[0].count;
            count++;
            //更新数据表
            db.run("UPDATE Stuff SET count = ? where id = ? ",count,1);
            //渲染页面
            resp.render('index', { title: 'Express' , count:  count});
        }else {
            console.log(err);
        }
    });
});

app.listen(9007);

module.exports = app;