var promise = require('bluebird');

var options = {
    promiseLib : promise
};

var pgp = require('pg-promise')(options);
var bluemixString = 'postgres://localhost:5432/iot';
//var bluemixString = 'postgres://eilvftrn:durY-RE4xzcpX2A3yvV2aeiADiR93EbH@qdjjtnkv.db.elephantsql.com:5432/eilvftrn';
var db = pgp(bluemixString);

module.exports = db