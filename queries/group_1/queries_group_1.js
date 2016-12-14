var db = require('../db_setup');


/**
 * [getAllData description]
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
function getAllData(req, res, next) {
  db.any('select * from group_1')
  .then(function (data) {
    res.status(200)
    .json({
      status: 'success',
      data: data,
      message: 'Retrieved ALL data'
    });
  })
  .catch(function (err) {
    return next(err);
  });
}

/**
 * [getDataWithType description]
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
function getDataWithType(req,res,next){
  var sensor = req.params.sensor_name;
  db.any('select * from sensor_group_1 where type = $1',[sensor])
  .then(function (data) {
    res.status(200)
    .json({
      status: 'success',
      data: data,
      message: 'Retrieved list of records'
    });
  })
  .catch(function (err) {
    return next(err);
  });
}



/**
 * Create data from gps sensor
 * Use for testing only
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
function createIMUData(req,res,next){
  var body_acc = {x:req.body.x_acc, y:req.body.y_acc, z:req.body.z_acc};
  var body_gyr = {x:req.body.x_gyr, y:req.body.y_gyr, z:req.body.z_gyr};
  var body_mag = {x:req.body.x_mag, y:req.body.y_mag, z:req.body.z_mag};
  var user_id = req.body.user_id;
  var device_id = req.body.device_id;
  db.none('insert into group_1 (user_id,device_id,type) values($10,$11,$12);' +
    'insert into sensor_group_1 (data_id,x,y,z,type,device_id) values(lastval(),$1,$2,$3,\'acc\',$11);' +
    'insert into sensor_group_1 (data_id,x,y,z,type, device_id) values(lastval(),$4,$5,$6,\'gyr\',$11);'+
    'insert into sensor_group_1 (data_id,x,y,z,type, device_id) values(lastval(),$7,$8,$9,\'mag\',$11);',
    [body_acc.x,body_acc.y,body_acc.z,
    body_gyr.x,body_gyr.y,body_gyr.z,
    body_mag.x,body_mag.y,body_mag.z,
    1,device_id,'imu'])
  .then(function() {
    res.status(200)
    .json({
      status: 'success'
    });
  })
  .catch(function (err){
    return next(err);
  });
}


/**
 * [getDataByDeviceId description]
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
function getIMUDataByDeviceId(req,res,next){
  var device_id = req.params.device_id;
  db.any('select d.* , g.timestamp from sensor_group_1 d, group_1 g where d.device_id=$1 and d.data_id = g.id;'
    ,[device_id])
  .then(function(data) {
    res.status(200)
    .json({

      data: data,

    });
  })
  .catch(function (err){
    return next(err);
  });
}
/**
 * [getDataByDeviceId description]
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
function getDataByDeviceId(req,res,next){
  var device_id = req.params.device_id;
  db.any('select d.* , g.timestamp from data_group_1 d, group_1 g where d.device_id=$1 and d.data_id = g.id;'
    ,[device_id])
  .then(function(data) {
    res.status(200)
    .json({

      data: data,

    });
  })
  .catch(function (err){
    return next(err);
  });
}

/**
 * [getDataByUserId description]
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
function getDataByUserId(req,res,next){
  db.any('select d.* , g.timestamp from data_group_1 d, group_1 g where g.user_id=$1 and d.data_id = g.id;'
    ,[req.body.user_id])
  .then(function(data) {
    res.status(200)
    .json({

      data: data,

    });
  })
  .catch(function (err){
    return next(err);
  });
}

/**
 * [getDataByDeviceIdAndUserId description]
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
function getDataByDeviceIdAndUserId(req,res,next){
  db.any('select d.* , g.timestamp from data_group_1 d, group_1 g where d.device_id=$1 and g.user_id=$2 and d.data_id = g.id;'
    ,[req.body.device_id,req.body.user_id])
  .then(function(data) {
    res.status(200)
    .json({
      data: data
    });
  })
  .catch(function (err){
    return next(err);
  });
}


/**
 * [createUsableData description]
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
function createGPSData(req,res,next){

  db.none(
    'insert into group_1(user_id,device_id,type) values($7,$6,$8);'
    +'insert into data_group_1(pitch,roll,lat,lon,velocity,yaw,device_id,data_id) values($1,$2,$3,$4,$5,$9,$6,lastval());',
  [req.body.pitch,req.body.roll, req.body.lat,req.body.lon
  ,req.body.velocity,req.body.device_id,1, 'gps',req.body.yaw])
  .then(function() {
    res.status(200)
    .json({
      status: 'success',
      message: "Inserted into database"
    });
  })
  .catch(function (err){
    return next(err);
  });
}

/**
 * [registerUser description]
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
function registerDevice(req,res,next){
  db.none('insert into device_group_1(device_id,password) values($1,$2);',
    [req.body.device_id,req.body.password])
  .then(function() {
    res.status(200)
    .json({
      status: 'success'
    });
  })
  .catch(function (err){
    err.status = 400;
    return next(err);
  });
}

/**
 * [loginUser description]
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
function loginDevice(req,res,next){
  db.one('select * from device_group_1 where device_id = $1 and password = $2;',
    [req.body.device_id, req.body.password])
  .then(function(data){
    res.status(200).json({
      status: "Login success",
      user: data
    });
  })
  .catch(function(err){
    err.code = 400;
    err.message = "Can't find user";
    return next(err);
  })
}

/**
 * [registerUser description]
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
function registerUser(req,res,next){
  db.none('insert into user_group_1(username,password) values($1,$2);',
    [req.body.username,req.body.password])
  .then(function() {
    res.status(200)
    .json({
      status: 'success',
      message: "Inserted into user database"
    });
  })
  .catch(function (err){
    err.status = 400;
    return next(err);
  });
}

/**
 * [loginUser description]
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
function loginUser(req,res,next){
  db.one('select * from user_group_1 where username = $1 and password = $2;',
    [req.body.username, req.body.password])
  .then(function(data){
    res.status(200).json({
      status: "Login success",
      user: data
    });
  })
  .catch(function(err){
    err.code = 400;
    err.message = "Can't find user";
    return next(err);
  })
}

function createMagneticRecord(req,res,next){

  db.none('insert into group_1(user_id,device_id,type) values($1,$2,$3);'
    +'insert into mag_switch_group_1 (device_id,rpm,hr,data_id) values($2,$4,$5,lastval());',
    [1,req.body.mac,'mag',req.body.rpm,req.body.hr])
  .then(function() {
    res.status(200)
    .json({
      status: 'success',
    });
  })
  .catch(function (err){
    return next(err);
  });
}

function getMagneticRecordByMAC(req,res,next){
  var mac = req.params.mac
  db.any('select * from mag_switch_group_1 where device_id=$1;',[mac])
  .then(function(data) {
    res.status(200)
    .json({
      data: data
    });
  })
  .catch(function (err){
    return next(err);
  });
}
module.exports = {
  getAllData: getAllData,
  createIMUData: createIMUData,
  getIMUDataByDeviceId: getIMUDataByDeviceId,
  getDataWithType: getDataWithType,
  loginUser: loginUser,
  registerUser: registerUser,
  loginDevice: loginDevice,
  registerDevice: registerDevice,
  createGPSData: createGPSData,
  getDataByUserId: getDataByUserId,
  getDataByDeviceId: getDataByDeviceId,
  getDataByDeviceIdAndUserId: getDataByDeviceIdAndUserId,
  createMagneticRecord: createMagneticRecord,
  getMagneticRecordByMAC: getMagneticRecordByMAC
};

