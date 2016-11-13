var express = require('express');
var router = express.Router();
var db = require('../queries');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/api/group_1', db.getAllData);
router.post('/api/group_1/post', db.createData);
router.put('/api/group_1/update/:id', db.updateData);
router.get('/api/group_1/delete/:id',db.getSingleData);
module.exports = router;
