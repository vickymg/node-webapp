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

/* GET New User page. */
router.get('/newuser', function(req, res) {
    res.render('newuser', { title: 'Add New User' });
});

/* POST to add user service */
router.post('/adduser', function(req, res) {
  // set internal db variable
  var db = req.db;
  // get form values
  var userName = req.body.username;
  var userEmail = req.body.useremail;
  // set the collection
  var collection = db.get('usercollection');
  // submit to the db
  collection.insert({
    "username": userName,
    "email": userEmail
  }, function(err, doc) {
    if (err) {
      // if it failed, return error
      res.send("There was a problem adding information to the databse");
    } else {
      // forward to success page
      res.redirect("userlist");
    }
  });
})

module.exports = router;
