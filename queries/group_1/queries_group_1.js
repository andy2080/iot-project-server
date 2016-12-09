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
 * [createData description]
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
function createData(req,res,next){
  var body_acc = {x:req.body.x_acc, y:req.body.y_acc, z:req.body.z_acc};
  var body_gyr = {x:req.body.x_gyr, y:req.body.y_gyr, z:req.body.z_gyr};
  var body_mag = {x:req.body.x_mag, y:req.body.y_mag, z:req.body.z_mag};
  var user_id = req.body.user_id;
  db.none('insert into group_1 (user_id) values($10);' +
    'insert into sensor_group_1 (id,x,y,z,type) values(lastval(),$1,$2,$3,\'acc\');' +
    'insert into sensor_group_1 (id,x,y,z,type) values(lastval(),$4,$5,$6,\'gyr\');'+
    'insert into sensor_group_1 (id,x,y,z,type) values(lastval(),$7,$8,$9,\'mag\');',
    [body_acc.x,body_acc.y,body_acc.z,
    body_gyr.x,body_gyr.y,body_gyr.z,
    body_mag.x,body_mag.y,body_mag.z,
    user_id])
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

module.exports = {
  getAllData: getAllData,
  createData: createData,
  getDataWithType: getDataWithType,
  loginUser: loginUser,
  registerUser: registerUser
};

