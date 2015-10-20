var express = require('express');

var router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {

  //
  //if(!count){
  // var count = 0;
  //}
  //count++;
  var dbtest = req.app.get("db");

  dbtest.run("SELECT * FROM Stuff",function(err,res){
    if(err){
      console.log(err);
    }
    else{
      console.log(JSON.stringify(res));
    }
  })
  console.log(dbtest);
  res.render('index', { title: 'Express' ,count:count });
});

module.exports = router;
