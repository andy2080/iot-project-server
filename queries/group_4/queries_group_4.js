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

/**
 * [getAllData description]
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
function getGoogleChartData(req, res, next) {
  db.any(' select temperature,humidity,door,timestamp from group_4 where timestamp >= \'2016-12-10\'::date and timestamp <= \'2016-12-13\'::date order by timestamp limit 10;')
  .then(function (data) {
    var mappedData = data.map(function(obj){
      var doorValue = obj.door == true ? 50 : null;
      //var modifiedTimestamp = new Date(obj.timestamp.replace(' ', 'T'));
      var o1 = {'v': doorValue};
      var o2 = {'v': obj.temperature};
      var o3 = {'v': obj.humidity};

      var dateForm = new Date(Date.parse(obj.timestamp)+1000);
      var formattedDate = dateForm.getHours() + ':' + dateForm.getMinutes() + ':' + dateForm.getSeconds();
      var o4 = {'v': formattedDate};
      return {'c':[o1,o2,o3,o4]}
    });

      res.status(200)
      .json({
          status: 'success',
          data: {
                cols: [{id: 'time', label: 'Time', type: 'string'},
                       {id: 'door', label: 'Door', type: 'number'},
                       {id: 'humidity', label: 'Humidity', type: 'number'},
                       {id: 'temperature', label: 'Temperature', type: 'number'}],
                rows: mappedData
                }
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
  getLastData: getLastData,
  getGoogleChartData: getGoogleChartData
};

