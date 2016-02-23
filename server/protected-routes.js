var express = require('express'),
    google = require('googleapis'),
    userSV  = require('./user.server');
    
var app = module.exports = express.Router();

/*var jwtCheck = jwt({
  secret: config.secret
});*/

// route middleware to make sure a user is logged in
var isLoggedIn = function (req, res, next) {

    // if user is authenticated in the session, carry on 
    if (req.isAuthenticated())
        return next();

    // if they aren't redirect them to the home page
    res.redirect('/');
}

app.use('/api/protected', isLoggedIn);

app.post('/api/protected/books', function(req, res) {
  
  var books = google.books('v1');
  
  var params = { q: req.body.text, key: process.env.API_KEY  };

  // get the long url of a shortened url
  books.volumes.list(params, function (err, response) {
    if (err) {
      res.status(200).send('Encountered error');
    } else {
      res.status(200).send(response);
      //console.log('Long url is', response.longUrl);
    }
  });
  
  //res.status(200).send(quoter.getRandomOne());
});

app.post('/api/protected/bookuseradd', function(req, res) {
  var callback=function(){
    res.status(200).send('success');
  }
  userSV.addbookuser(req.user._id,req.body,callback);
});

app.post('/api/protected/bookuserdel', function(req, res) {
  var callback=function(){
    res.status(200).send('success');
  }
  userSV.delbookuser(req.user._id,req.body,callback);
});

app.get('/api/protected/bookinvget', function(req, res){
  var callback=function(data){
    res.status(200).send(data);
  }
  userSV.addbookinv(req.user._id,callback);
});

app.post('/api/protected/booktradeadd', function(req, res){
  var callback=function(){
    res.status(200).send('success');
  }
  userSV.booktradeadd(req.user._id,req.body,callback);
});

app.get('/api/protected/booktradeinvget', function(req, res){
  var callback=function(data){
    res.status(200).send(data);
  }
  userSV.booktradeinvget(callback);
});

app.post('/api/protected/booktaketrade', function(req, res){
  var callback=function(){
    res.status(200).send('success');
  }
  userSV.booktaketrade(req.user._id,req.body,callback);
});




