//var express = require('express');

//var app = module.exports = express.Router();


module.exports = function(app) {
    app.get('/',function(req,res){
      res.status(200).sendFile(process.cwd()+'/index.html');
    });
}
