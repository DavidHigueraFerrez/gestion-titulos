var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
/* GET home page secretaria. */
router.get('/pas/gestion-titulos', function(req, res, next) {
  res.render('index-secretaria', { title: 'Express' });
});

/* GET home page responsable secretaria. */
router.get('/pas/gestion-titulos/responsable', function(req, res, next) {
  res.render('index-responsable', { title: 'Express' });
});


/* GET home page estudiantes. */
router.get('/estudiantes/gestion-titulos', function(req, res, next) {
  res.render('index-estudiantes', { title: 'Express' });
});

module.exports = router;
