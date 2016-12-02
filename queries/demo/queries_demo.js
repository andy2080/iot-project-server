var db = require('../db_setup');



/**
 * [getAllData description]
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
function getAllData(req, res, next) {
  db.any('select * from demo')
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
    db.any('select * from demo where sensor_name = $1',[sensor])
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

    db.none('insert into demo(value,sensor_name)' +
        'values(${value},${sensor_name})',
        req.body)
    .then(function() {
        res.status(200)
        .json({
            status: 'success',
            message: "Record created"
        });
    })
    .catch(function (err){
        return next(err);
    });
}

/**
 * [updateData description]
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
function updateData(req,res,next){
    db.none('update demo set value=$1, time_stamp=now() where id=$2',
        [req.body.value,parseInt(req.params.id)])
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

module.exports = {
  getAllData: getAllData,
  createData: createData,
  updateData: updateData,
  getDataWithType: getDataWithType
};

