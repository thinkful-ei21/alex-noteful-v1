const app = require('../server');
const chai = require('chai');
const chaiHttp = require('chai-http');
const expect = chai.expect;

chai.use(chaiHttp);

describe('Reality check', function () {

  it('true should be true', function () {
    expect(true).to.be.true;
  });

  it('2 + 2 should equal 4', function () {
    expect(2 + 2).to.equal(4);
  });

});
describe('noteful app', function() {

let server;
before(function () {
    return app.startServer()
      .then(instance => server = instance);
});

after(function () {
    //return server.stopServer();
});

describe('Express static', function () {

    it('GET request "/" should return the index page', function () {
      return chai.request(server)
        .get('/')
        .then(function (res) {
          expect(res).to.exist;
          expect(res).to.have.status(200);
          expect(res).to.be.html;
        });
    });
  
  });
  
  describe('404 handler', function () {
  
    it('should respond with 404 when given a bad path', function () {
      return chai.request(server)
        .get('/DOES/NOT/EXIST')
        .then(res => {
          expect(res).to.have.status(404);
        });
    });
  
  });

describe('get api/notes', function () {
  
    it('should respond return the default of 10 notes array', function () {
      return chai.request(server)
        .get('/api/notes/')
        .then(res => {
          expect(res.body.length).to.equal(10);
        
        });
        });
    

    it('should return an array of objects with the id, title and content', function () {
        return chai.request(server)
          .get('/api/notes/')
          .then(res => {
            res.body.forEach(function (item) {
                expect(item).to.have.keys('id', 'title', 'content');
            });
            
          });
    });
    it('should return correct search results for a valid query', function () {
        return chai.request(server)
          .get('/api/notes/1000')
          .then(res => {
            expect(res.body.id).to.equal(1000);
        });  
    });
    it('should return an empty array for an incorrect query', function () {
        return chai.request(server)
          .get('/api/notes/9000')
          .then(res => {
            expect(res.body.length).to.equal(undefined);
        });  
    });
});

describe('POST /api/notes', function () {
  
});
});
  