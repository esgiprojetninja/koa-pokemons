const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const { server } = require('../../app');
console.log('fdp', server);

describe('TODOS GET /', () => {
    it('should return json', done => {
        chai.request(server)
            .get('/')
            .end((err, res) => {
                should.not.exist(err);
                res.status.should.eql(200);
                res.type.should.eql('application/json');
                res.body.status.should.equal('success');
                res.body.message.should.eql('hello, world!');
                done();
            });
    });
});
