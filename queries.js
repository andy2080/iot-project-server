var promise = require('bluebird');

var options = {
    promiseLib : promise
};

var pgp = require('pg-promise')(options);
var connectionString = 'postgres://localhost:5432/iot';
var db = pgp(connectionString);


// Query functions

//Get all data
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

//Get a single record
function getSingleData(req,res,next){
    var id = parseInt(req.params.id);
    db.one('select * from group_1 where id = $1',id)
    .then(function (data) {
      res.status(200)
      .json({
          status: 'success',
          data: data,
          message: 'Retrieved a single record'
      });
  })
    .catch(function (err) {
      return next(err);
  });
}

//Post data
function createData(req,res,next){
    db.none('insert into group_1(value,sensor_name,time_stamp)' +
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
  getAllData: getAllData,
  createData: createData,
  getSingleData: getSingleData,
  updateData: updateData
};

