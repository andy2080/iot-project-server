var express = require('express');
var router = express.Router();
var db_1 = require('../queries/group_1/queries_group_1'),
 db_2 = require('../queries/group_2/queries_group_2'),
 demo_query = require('../queries/demo/queries_demo');

var jwt = require('express-jwt'),
    teamValidation = require('../authentication/validate');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

var jwtValidation = jwt({secret: 'iot-project-metropolia'});

//Chain middleware
router.get('/api/demo', jwtValidation , teamValidation.validateDemo ,demo_query.getAllData);
router.get('/api/demo/:sensor_name',jwtValidation , teamValidation.validateDemo ,demo_query.getDataWithType);
router.post('/api/demo',jwtValidation , teamValidation.validateDemo , demo_query.createData);
router.put('/api/demo/:id',jwtValidation , teamValidation.validateDemo , demo_query.updateData);

//Validate token -> validate valid group -> execute query
router.get('/api/group_1', jwtValidation , teamValidation.validateGroupOne ,db_1.getAllData);
router.get('/api/group_1/:sensor_name',jwtValidation , teamValidation.validateGroupOne ,db_1.getDataWithType);
router.post('/api/group_1/post',jwtValidation , teamValidation.validateGroupOne , db_1.createData);
router.put('/api/group_1/update/:id',jwtValidation , teamValidation.validateGroupOne , db_1.updateData);


module.exports = router;
