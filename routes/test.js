/**
 * Created by python on 10/15/15.
 */
//file:test.js
var sqlite3 = require('sqlite3');
var sa = "hello";
var db = new sqlite3.Database('sum.db',function() {
    db.run("create table test(name int(11))",function(){
        db.run("insert into test values(?)",function(){
            db.all("select * from test",function(err,res){
                if(!err)
                    console.log(JSON.stringify(res[0].name));
                else
                    console.log(err);
            });
        })
    });
});