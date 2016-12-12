var db = require('../db_setup');


/**
 * Get all records
 * @param  {[type]}   req  request
 * @param  {[type]}   res  result
 * @param  {Function} next chain function
 * @return {[type]}        All records from table
 */
function getAllData(req, res, next) {
  db.any('select * from group_9')
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
    db.any('select * from group_9 where door = $1 ' ,[sensor])
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

    db.none('insert into group_9(door,temperature,light,humidity)' +
        'values($1,$2,$3,$4);',
        [req.body.door,req.body.temperature,req.body.light,req.body.humidity])
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


module.exports = {
  getAllData: getAllData,
  createData: createData
};

