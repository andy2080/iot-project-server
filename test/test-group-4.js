var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../app');
var should = chai.should();

var demoRecord = require('./mock-data').DemoRecord;



chai.use(chaiHttp);
var dict = []; // create an empty array
var header = {'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiR1JPVVBfNCJ9.COOHEkF1SpIU3SA5j09t1ZNY9TRr6IFGg6Q7F9S46_I'};


describe('****Queries group 4****',function(){
  //GET ALL
  it('should list ALL data on /api/group_4 GET' , function(done){
    chai.request(server)
    .get('/api/group_4')
    .set(header)
    .end(function(err, res){
      res.should.have.status(200);
      res.should.be.json;
      done();
    });
  });

  //Should fail
  it('should fail with no Authorization /api/group_4 GET' , function(done){
    chai.request(server)
    .get('/api/group_4')
    .end(function(err, res){
      res.should.have.status(401);
      res.should.be.json;
      done();
    });
  });

  //Test post demo

  it('should successfully insert into database /api/group_4 POST', function(done){
    //Mock data
    var fakeData = {"door":true,"humidity":2.3,"temperature":3.4};

    chai.request(server)
    .post('/api/group_4')
    .set(header)
    .send(fakeData)
    .end(function(err,res){
      res.should.have.status(200);
      res.should.be.json;
      done();
    })
  });

});
