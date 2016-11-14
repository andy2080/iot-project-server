var promise = require('bluebird');

var options = {
    promiseLib : promise
};

var pgp = require('pg-promise')(options);
//var bluemixString = 'postgres://localhost:5432/iot';
var bluemixString = 'postgres://ycmgimuh:GjtczE5znkcFfwzZW29qNM7xALCUsIgn@jumbo.db.elephantsql.com:5432/ycmgimuh';
var db = pgp(bluemixString);

module.exports = db