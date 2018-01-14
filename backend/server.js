const express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  bodyParser = require('body-parser'),
  routes = require('./api/routes/shopRoutes'),
  fileUpload = require('express-fileupload');;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(fileUpload({
  limits: {
    fileSize: 1 * 1024 * 1024,
    fields: 50,
    files: 6,
    parts: 51,
  }
}));

routes(app);
app.listen(port);

console.log('Shop RESTful API server started on: ' + port);