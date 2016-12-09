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
//Test for group 1
it('should success insert /api/group_1 POST.', function(done){

  var fakeData = new demoRecordGroup1(3.423,2.34,34.3,3.34,5.34,52.3,43.4,23.3,434.2);
  chai.request(server)
  .post('/api/group_1')
  .set(header_group_1)
  .send(fakeData)
  .end(function(err,res){

    res.should.have.status(200);
    res.should.be.json;
    done();
  })
});


it('should return correct sensor value /api/group_1 GET.', function(done){

  chai.request(server)
  .get('/api/group_1/acc')
  .set(header_group_1)
  .end(function(err,res){
    res.should.have.status(200);
    res.should.be.json;
    done();
  })
});

it('should success register user /api/group_1/register POST.', function(done){
  var fakeUser = {username: 'lnk', password: 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3'};
  chai.request(server)
  .post('/api/group_1/register')
  .set(header_group_1)
  .send(fakeUser)
  .end(function(err,res){

    res.should.have.status(200);
    res.should.be.json;
    done();
  })
});

it('should success login user /api/group_1/login post.', function(done){
  var fakeUser = {username: 'nguyen', password: 'a665a45920422f9d417e4867efdc4fb8a04a1f3fff1fa07e998e86f7f7a27ae3'};
  chai.request(server)
  .post('/api/group_1/login')
  .set(header_group_1)
  .send(fakeUser)
  .end(function(err,res){

    res.should.have.status(200);
    res.should.be.json;
    done();
  })
});

it('should success post data user /api/group_1/data post.', function(done){
  var fakeUser = {pitch: 23.3, roll: 2.3,lat:60.234234, lon:21.24234, velocity: 23.4,device_id: 1411,user_id:1};
  chai.request(server)
  .post('/api/group_1/data')
  .set(header_group_1)
  .send(fakeUser)
  .end(function(err,res){

    res.should.have.status(200);
    res.should.be.json;
    done();
  })
});


it('should success get data by device /api/group_1/data get.', function(done){
var fakeData = {device_id:'1411'};
  chai.request(server)
  .get('/api/group_1/data/device')
  .set(header_group_1)
  .send(fakeData)
  .end(function(err,res){

    res.should.have.status(200);
    res.should.be.json;
    done();
  })

});

it('should success get data by user id /api/group_1/data/user get.', function(done){
  var fakeData = {user_id:'1'};
  chai.request(server)
  .get('/api/group_1/data/user')
  .set(header_group_1)
  .send(fakeData)
  .end(function(err,res){

    res.should.have.status(200);
    res.should.be.json;
    done();
  })
});


it('should success get data by user and device id /api/group_1/data get.', function(done){
  var fakeData = {user_id:1, device_id:'1411'};
  chai.request(server)
  .get('/api/group_1/data/unify')
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


