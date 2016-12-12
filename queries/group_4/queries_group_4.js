var db = require('../db_setup');



/**
 * [getAllData description]
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
function getAllData(req, res, next) {
  db.any('select * from group_4')
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
 * [createData description]
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
function createData(req,res,next){

    db.none('insert into group_4(door,humidity,temperature)' +
        'values(${door},${humidity},${temperature})',
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
 * [createData description]
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
function deleteAllData(req,res,next){

    db.none('delete from group_4;')
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
 * [getAllData description]
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
function getLastData(req, res, next) {
  db.any('select * from group_4 order by timestamp desc limit 1;')
  .then(function (data) {
      res.status(200)
      .json({
          status: 'success',
          data: data
      });
  })
  .catch(function (err) {
      return next(err);
  });
}

module.exports = {
  getAllData: getAllData,
  createData: createData,
  deleteAllData: deleteAllData,
  getLastData: getLastData
};

