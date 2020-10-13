const chai = require('chai');
const chaiHttp = require('chai-http');
const should = chai.should();
const server = require('../../app');
// Chai HTTP init

chai.use(chaiHttp);
// TEST ROOT init
let token, cardId;

describe('/cards', () => {
    before((done) => {
        chai.request(server)
            .post('/signIn')
            .send({username: 'zeus', password: '12345'})
            .end(async (err,res) => {
                token = await res.body.token;
                //console.log(token);
                done();
            })
    });

    describe('/GET Cards', () => {
        it('should GET all the Cards', (done) => {
            chai.request(server)
                .get('/cards')
                .set('x-access-token', token)
                .end((err,res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('array');
                    done();
                });
        });
    });

    describe('/POST Card', () => {
        it('should GET new card', (done) => {
            const card = {
                title: 'Visa Test',
                amount: 16520,
                holder_id: '5f458ab18ce8c0ccee244243',
                category: 'Visa Classic Test',
                country: 'Test Country',
                year: 2020,
                type: 'Test Type'
            };

            chai.request(server)
                .post('/cards/new')
                .send(card)
                .set('x-access-token', token)
                .end((err,res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('title');
                    res.body.should.have.property('amount');
                    res.body.should.have.property('category');
                    res.body.should.have.property('country');
                    res.body.should.have.property('year');
                    res.body.should.have.property('type');
                    cardId = res.body._id;
                    done();
                });
        });
    });

    describe('/GET/:holder_id Card', () => {
        it('should GET a card by the holder', (done) => {
            chai.request(server)
                .get('/cards/' + cardId)
                .set('x-access-token', token)
                .end((err,res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('title');
                    res.body.should.have.property('amount');
                    res.body.should.have.property('holder_id');
                    res.body.should.have.property('category');
                    res.body.should.have.property('country');
                    res.body.should.have.property('year');
                    res.body.should.have.property('type');
                    res.body.should.have.property('_id').eql(cardId);
                    done();
                });
        });
    });

    describe('/PUT/:holder_id Card UPDATE', () => {
        it('should GET update the card', (done) => {
            const card = {
                title: 'Visa Test',
                amount: 16520,
                holder_id: '5f458ab18ce8c0ccee244244',
                category: 'Visa Classic Test',
                country: 'Test Country',
                year: 2020,
                type: 'Test Type'
            };

            chai.request(server)
                .put('/cards/' + cardId)
                .send(card)
                .set('x-access-token', token)
                .end((err,res) => {
                    res.should.have.status(200);
                    res.body.should.have.property('title').eql(card.title);
                    res.body.should.have.property('holder_id').eql(card.holder_id);
                    res.body.should.have.property('amount').eql(card.amount);
                    res.body.should.have.property('category').eql(card.category);
                    res.body.should.have.property('country').eql(card.country);
                    res.body.should.have.property('year').eql(card.year);
                    res.body.should.have.property('type').eql(card.type);
                    done();
                });
        });
    });

    describe('/DELETE/:holder_id' , () => {
        it('should be Delete the caard', (done) => {
            chai.request(server)
                .delete('/cards/' + cardId)
                .set('x-access-token', token)
                .end((err,res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.should.have.property('status').eql(200);
                    done();
                });
        });
    })

});