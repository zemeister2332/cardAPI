const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const server = require('../../app.js');
// Chai HTTP init
chai.use(chaiHttp);
// TEST ROOT init
describe('Node Server', () => {
    it('(GET /) bosh sahifasi ', (done) => {
        chai.request(server)
            .get('/')
            .end((err,res) => {
                res.should.have.status(200);
                done();
            })
    });
});