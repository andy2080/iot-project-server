var db = require('../db_setup');



/**
 * [getAllData description]
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
function getAllData(req, res, next) {
  db.any('select * from group_6')
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

/**
 * [getDataWithType description]
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
function getDataWithType(req,res,next){
    var sensor = req.params.sensor_name;
    db.any('select timestamp, $1 from group_6;',[sensor])
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



/**
 * [createData description]
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
function createData(req,res,next){

    db.none('insert into group_6(soil,humidity,temperature)' +
        'values(${soil},${humidity},${temperature})',
        req.body)
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
  createData: createData,
  getDataWithType: getDataWithType
};

