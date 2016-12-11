var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../app');
var should = chai.should();

var demoRecord = require('./mock-data').DemoRecord;
var demoRecordGroup1 = require('./mock-data').DemoRecordGroup1;
var demoRecordGroup9 = require('./mock-data').DemoRecordGroup9;

chai.use(chaiHttp);

var header_group_1 = {'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiR1JPVVBfMSIsImFkbWluIjp0cnVlfQ.eKvUFe2OdsnZUfee8Xoi_vHixDOzs2rchkIFaegHE4E'};

describe('****Queries group 1****',function(){

/*
it('should success post data user /api/group_1/gps post.', function(done){
  var fakeData = {pitch: 22.3, roll: 2.3,lat:60.234234, lon:21.24234, velocity: 23.4,device_id: '5c7f8702cfff0',user_id:1,data_type: 'gps'};
  chai.request(server)
  .post('/api/group_1/gps')
  .set(header_group_1)
  .send(fakeData)
  .end(function(err,res){

    res.should.have.status(200);
    res.should.be.json;
    done();
  })
});
*/

it('should success insert mag data /api/group_1/magnetic post.', function(done){
  var fakeData = {mac:'5c7f8702cfff0', rpm:32.3, user_id:1, data_type: 'mag'};
  chai.request(server)
  .post('/api/group_1/magnetic')
  .set(header_group_1)
  .send(fakeData)
  .end(function(err,res){
    console.log(res.body);
    res.should.have.status(200);
    res.should.be.json;
    done();
  })
});


});


