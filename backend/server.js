const express = require('express'),
  app = express(),
  port = process.env.PORT || 3000,
  bodyParser = require('body-parser'),
  routes = require('./api/routes/shopRoutes'),
  fileUpload = require('express-fileupload'),
  cookieParser = require('cookie-parser'),
  session = require('express-session'),
  cors = require('cors');

app.use(cors());

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'DELETE, PUT, GET, POST');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

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

app.use(cookieParser());

app.use(session({
  key: 'user_sid',
  secret: 'c45ccfb3-fb74-4608-95b0-eb691abf4dea',
  resave: false,
  saveUninitialized: false,
  cookie: {
    expires: 1000 * 60 * 60 * 5
  }
}));

app.use((req, res, next) => {
  if (req.cookies.user_sid && !req.session.user)
    res.clearCookie('user_sid');
  next();
});

routes(app);
app.listen(port);

console.log('Shop RESTful API server started on: ' + port);