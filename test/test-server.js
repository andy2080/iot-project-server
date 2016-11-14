var chai = require('chai');
var chaiHttp = require('chai-http');
var server = require('../app');
var should = chai.should();
var keys = require('../queries/auth_keys');

chai.use(chaiHttp);


describe('models',function(){
    it('should list ALL data on /api/group_1 GET' , function(done){
        chai.request(server)
        .get('api/group_1')
        .end(function(err, res){
          res.should.have.status(200);
          res.should.be.json;
          done();
      });
    });
    it('should list a SINGLE blob on /blob/<id> GET');
    it('should add a SINGLE blob on /blobs POST');
    it('should update a SINGLE blob on /blob/<id> PUT');
    it('should delete a SINGLE blob on /blob/<id> DELETE');
});