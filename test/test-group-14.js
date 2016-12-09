var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../app');
var should = chai.should();

var demoRecord = require('./mock-data').DemoRecord;



chai.use(chaiHttp);
var dict = []; // create an empty array
var header = {'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiR1JPVVBfMTQifQ.Kl5Hm_VOF1Xrv1S21Pp4B3azA44HtWCXW9AqIN2MIgc'};


describe('****Queries group 14****',function(){
  //GET ALL
  it('should list ALL data on /api/group_14 GET' , function(done){
    chai.request(server)
    .get('/api/group_14')
    .set(header)
    .end(function(err, res){
      res.should.have.status(200);
      res.should.be.json;
      done();
    });
  });

  //Should fail
  it('should fail with no Authorization /api/group_14 GET' , function(done){
    chai.request(server)
    .get('/api/group_14')
    .end(function(err, res){
      res.should.have.status(401);
      res.should.be.json;
      done();
    });
  });

  //Test post demo

  it('should successfully insert into database /api/group_14 POST', function(done){
    //Mock data
    var fakeData = new demoRecord(2.3,'ult');

    chai.request(server)
    .post('/api/group_14')
    .set(header)
    .send(fakeData)
    .end(function(err,res){
      res.should.have.status(200);
      res.should.be.json;
      done();
    })
  });

  it('should fail insert into database /api/group_14 POST. Case: wrong value param ', function(done){
    //Mock data
    var fakeData = new demoRecord("fasdf",'a');

    chai.request(server)
    .post('/api/group_14')
    .set(header)
    .send(fakeData)
    .end(function(err,res){
      res.should.have.status(500);
      res.should.be.json;
      done();
    })
  });

  it('should fail insert into database /api/group_14 POST. Case: wrong sensor name param ', function(done){
    //Mock data
    var fakeData = new demoRecord(3.423,'humid');
    chai.request(server)
    .post('/api/group_14')
    .set(header)
    .send(fakeData)
    .end(function(err,res){
      res.should.have.status(500);
      res.should.be.json;
      done();
    })
  });
});
