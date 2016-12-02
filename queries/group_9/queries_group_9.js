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
    db.any('select * from group_9 where sensor_name = $1',[sensor])
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



//Post data
function createData(req,res,next){

    db.none('insert into group_9(value,sensor_name,time_stamp)' +
        'values(${value},${sensor_name},now())',
        req.body)
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

//Update data
function updateData(req,res,next){
    db.none('update group_1 set value=$1, time_stamp=now() where id=$2',
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
  getAllData: getAllData
  /*createData: createData,
  updateData: updateData,
  getDataWithType: getDataWithType*/
};

