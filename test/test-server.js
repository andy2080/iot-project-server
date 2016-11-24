var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../app');
var should = chai.should();
var keys = require('../queries/auth_keys');
var demoRecord = require('./mock-data')


chai.use(chaiHttp);
var dict = []; // create an empty array
var header = {'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiREVNTyIsImFkbWluIjp0cnVlfQ.xa-_nKy-UscyAcKfzv123Fle05fkQHiH_CGmCDw-CzU'};
dict.push({
    key:   "Authorization",
    value: "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiREVNTyIsImFkbWluIjp0cnVlfQ.xa-_nKy-UscyAcKfzv123Fle05fkQHiH_CGmCDw-CzU"
});

describe('queries',function(){
  //GET ALL
  it('should list ALL data on /api/demo GET' , function(done){
    chai.request(server)
    .get('/api/demo')
    .set(header)
    .end(function(err, res){
      res.should.have.status(200);
      res.should.be.json;
      done();
    });
  });

  //Should fail
  it('should fail with no Authorization /api/demo GET' , function(done){
    chai.request(server)
    .get('/api/demo')
    .end(function(err, res){
      res.should.have.status(401);
      res.should.be.json;
      done();
    });
  });

  //Test post demo

  it('should successfully insert into database /api/demo POST', function(done){
    //Mock data
    var fakeData = new demoRecord(2.3,'humidity');

    chai.request(server)
    .post('/api/demo')
    .set(header)
    .send(fakeData)
    .end(function(err,res){
      res.should.have.status(200);
      res.should.be.json;
      done();
    })
  });

  it('should fail insert into database /api/demo POST. Case: wrong value param ', function(done){
    //Mock data
    var fakeData = new demoRecord("fasdf",'humidity');

    chai.request(server)
    .post('/api/demo')
    .set(header)
    .send(fakeData)
    .end(function(err,res){
      res.should.have.status(500);
      res.should.be.json;
      done();
    })
  });

  it('should fail insert into database /api/demo POST. Case: wrong sensor name param ', function(done){
    //Mock data
    var fakeData = new demoRecord(3.423,'humid');

    chai.request(server)
    .post('/api/demo')
    .set(header)
    .send(fakeData)
    .end(function(err,res){
      res.should.have.status(500);
      res.should.be.json;
      done();
    })
  });



});