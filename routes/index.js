var express = require('express');
var router = express.Router();
var db_1 = require('../queries/group_1/queries_group_1'),
db_4 = require('../queries/group_4/queries_group_4'),
db_6 = require('../queries/group_6/queries_group_6'),
 db_9 = require('../queries/group_9/queries_group_9'),
 db_14 = require('../queries/group_14/queries_group_14'),
 db_18 = require('../queries/group_18/queries_group_18'),
 db_20 = require('../queries/group_20/queries_group_20'),
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

//Validate token -> validate group -> execute query

/**
 *
 */

//Get all data
router.get('/api/group_1', jwtValidation , teamValidation.validateGroupOne ,db_1.getAllData);

//Get data by sensor
router.get('/api/group_1/gps/:sensor_name',jwtValidation , teamValidation.validateGroupOne ,db_1.getDataWithType);


router.post('/api/group_1',jwtValidation , teamValidation.validateGroupOne , db_1.createData);
router.post('/api/group_1/register',jwtValidation , teamValidation.validateGroupOne , db_1.registerUser);
router.post('/api/group_1/login',jwtValidation , teamValidation.validateGroupOne , db_1.loginUser);
router.post('/api/group_1/data',jwtValidation , teamValidation.validateGroupOne , db_1.createUsableData);

router.get('/api/group_1/gps/device/:device_id',jwtValidation , teamValidation.validateGroupOne , db_1.getDataByDeviceId);
router.get('/api/group_1/data/user',jwtValidation , teamValidation.validateGroupOne , db_1.getDataByUserId);
router.get('/api/group_1/data/unify',jwtValidation , teamValidation.validateGroupOne , db_1.getDataByDeviceIdAndUserId);

router.get('/api/group_1/magnetic/:mac',jwtValidation , teamValidation.validateGroupOne , db_1.getMagneticRecordByMAC);
router.post('/api/group_1/magnetic',jwtValidation , teamValidation.validateGroupOne , db_1.createMagneticRecord);

//Router for group 4
router.get('/api/group_4', jwtValidation , teamValidation.validateGroupFour ,db_4.getAllData);
router.post('/api/group_4', jwtValidation , teamValidation.validateGroupFour ,db_4.createData);

//Router for group 6
router.get('/api/group_6', jwtValidation , teamValidation.validateGroupSix ,db_6.getAllData);
router.post('/api/group_6', jwtValidation , teamValidation.validateGroupSix ,db_6.createData);
router.get('/api/group_6/:sensor_name',jwtValidation , teamValidation.validateGroupSix ,db_6.getDataWithType);

//Router for group 9
router.get('/api/group_9', jwtValidation , teamValidation.validateGroupNine ,db_9.getAllData);
router.post('/api/group_9', jwtValidation , teamValidation.validateGroupNine ,db_9.createData);

//Router for group 14
router.get('/api/group_14', jwtValidation , teamValidation.validateGroupFourteen ,db_14.getAllData);
router.get('/api/group_14/:sensor_name',jwtValidation , teamValidation.validateGroupFourteen ,db_14.getDataWithType);
router.post('/api/group_14', jwtValidation , teamValidation.validateGroupFourteen ,db_14.createData);

//Router for group 18
router.get('/api/group_18', jwtValidation , teamValidation.validateGroupEighteen ,db_18.getAllData);
router.post('/api/group_18', jwtValidation , teamValidation.validateGroupEighteen ,db_18.createData);

//Router for group 20
router.get('/api/group_20', jwtValidation , teamValidation.validateGroupTwenty ,db_20.getAllData);
router.get('/api/group_20/:sensor_name',jwtValidation , teamValidation.validateGroupTwenty ,db_20.getDataWithType);
router.post('/api/group_20', jwtValidation , teamValidation.validateGroupTwenty ,db_20.createData);
module.exports = router;
