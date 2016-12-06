var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../app');
var should = chai.should();


var demoRecordGroup9 = require('./mock-data').DemoRecordGroup9;


chai.use(chaiHttp);
var dict = []; // create an empty array

var header_group_9 = {'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiR1JPVVBfOSJ9.Gp73S7NH1sMEW494cObPiC_cu60w1ASqDFzG35GL5bo'};


/**
 * Group 9 queries tests
 * @param  {demoRecordGroup9} ){                 var fakeData [description]
 * @return {[type]}               [description]
 */
describe('****Queries group 9****', function(){
  //Mock data
  var fakeData = new demoRecordGroup9(false,2.3,4.3,2.5);
  it('should return everything /api/group_9 GET.', function(done){
    chai.request(server)
    .get('/api/group_9')
    .set(header_group_9)
    .end(function(err,res){
      res.should.have.status(200);
      res.should.be.json;
      done();
    })
  });

  it('should success insert /api/group_9 POST.', function(done){
    chai.request(server)
    .post('/api/group_9')
    .set(header_group_9)
    .send(fakeData)
    .end(function(err,res){

      res.should.have.status(200);
      res.should.be.json;
      done();
    })
  });


});