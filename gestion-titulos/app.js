var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

//para el uso de contextPath si lo cambias mediante docker
const normalize = require('normalize-path');


var app = express();

//contextos de la aplicacion
const contextPathPAS = normalize(process.env.CONTEXTOPAS || '/pas/');
const contextPathESTD =normalize(process.env.CONTEXTOESTD || '/estudiantes/');
const contextPathGestionTitulos =normalize(process.env.CONTEXTOGESTIONTITULOS || '/gestion-titulos/');


//exports de los contextos
exports.contextPathPAS = contextPathPAS;
exports.contextPathGestionTitulos = contextPathGestionTitulos;
exports.contextPathESTD = contextPathESTD;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//paths para acceso a files
app.use(contextPathPAS, express.static(path.join(__dirname, 'public')));
app.use(contextPathESTD, express.static(path.join(__dirname, 'public')));


app.use('/', indexRouter);
app.use('/users', usersRouter);


//styles para pas -estudiantes
app.get(contextPathPAS +"/stylesheets/style.css", function(req, res, next) {
  res.sendFile('/public/stylesheets/style.css', {root: __dirname});
});
//para responsable view
app.get(contextPathPAS +contextPathGestionTitulos +"/stylesheets/style.css", function(req, res, next) {
  res.sendFile('/public/stylesheets/style.css', {root: __dirname});
});

app.get(contextPathESTD +"/stylesheets/style.css", function(req, res, next) {
  res.sendFile('/public/stylesheets/style.css', {root: __dirname});
});


//fotos para logo etsit
app.get(contextPathPAS+ "/images/logo-etsit.gif", function(req, res, next) {
  res.sendFile('/public/images/logo-etsit.gif', {root: __dirname});
 });

//para responsable view
app.get(contextPathPAS + contextPathGestionTitulos + "/images/logo-etsit.gif", function(req, res, next) {
  res.sendFile('/public/images/logo-etsit.gif', {root: __dirname});
 });

 app.get(contextPathESTD+ "/images/logo-etsit.gif", function(req, res, next) {
   res.sendFile('/public/images/logo-etsit.gif', {root: __dirname});
 });


 
 //fotos para logo upm
app.get(contextPathPAS +"/images/logo-upm.gif", function(req, res, next) {
  res.sendFile('/public/images/logo-upm.gif', {root: __dirname});
});

//para responsable view 
app.get(contextPathPAS +contextPathGestionTitulos +"/images/logo-upm.gif", function(req, res, next) {
  res.sendFile('/public/images/logo-upm.gif', {root: __dirname});
});

app.get(contextPathESTD +"/images/logo-upm.gif", function(req, res, next) {
  res.sendFile('/public/images/logo-upm.gif', {root: __dirname});
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
