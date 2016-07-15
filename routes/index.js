var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

/* GET Hello World page. */
router.get('/helloworld', function(req, res) {
  res.render('helloworld', { title: 'Hello, World!'});
});

/* GET Userlist page. */
// extracts the db object passed to the http request
// uses that db connection to fill the 'docs' variable with databse documents (i.e. user data)
// followed by a page render
router.get('/userlist', function(req, res) {
  var db = req.db;
  var collection = db.get('usercollection');
  collection.find({},{}, function(e, docs) {
    res.render('userlist', {
      "userlist" : docs
    });
  });
});

module.exports = router;
