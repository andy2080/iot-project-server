var express = require('express');
var router = express.Router();
var db_1 = require('../queries/queries_group_1'),
 db_2 = require('../queries/queries_group_2');

var jwt = require('express-jwt'),
    teamValidation = require('../authentication/validate');
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

var jwtValidation = jwt({secret: 'iot-project-metropolia'});

//Chain middleware
//Validate token -> validate valid group -> execute query
router.get('/api/group_1', jwtValidation , teamValidation.validateGroupOne ,db_1.getAllData);
router.get('/api/group_1/:sensor_name',jwtValidation , teamValidation.validateGroupOne ,db_1.getDataWithType);
router.post('/api/group_1/post',jwtValidation , teamValidation.validateGroupOne , db_1.createData);
router.put('/api/group_1/update/:id',jwtValidation , teamValidation.validateGroupOne , db_1.updateData);


module.exports = router;
