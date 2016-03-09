const chai = require('chai');
const chaiHttp = require('chai-http');
chai.use(chaiHttp);
const expect = chai.expect;
const mongoose = require('mongoose');
process.env.MONGOLAB_URI = 'mongodb://localhost/galleries_app_test';
const server = require(__dirname + '/../server');
const Gallery = require(__dirname + '/../models/gallery');

describe('the galleries api', () => {
  after((done) => {
    mongoose.connection.db.dropDatabase(() => {
      done();
    });
  });

  it('should be able to retrieve all our galleries', (done) => {
    chai.request('localhost:3000')
      .get('/api/galleries')
      .end((err, res) => {
        expect(err).to.eql(null);
        expect(Array.isArray(res.body)).to.eql(true);
        done();
      });
  });

  it('should create a gallery with a POST', (done) => {
    chai.request('localhost:3000')
      .post('/api/galleries')
      .send({caption: 'test gallery'})
      .end(function(err, res) {
        expect(err).to.eql(null);
        expect(res).to.have.status(200);
        expect(res.body.caption).to.eql('test gallery');
        expect(res.body).to.have.property('_id');
        done();
      });
  });

  describe('rest requests that require a gallery already in db', () => {
    beforeEach((done) => {
      Gallery.create({caption: 'test gallery'}, (err, data) => {
        this.testGallery = data;
        done();
      });
    });

    it('should be able to update a gallery', (done) => {
      chai.request('localhost:3000')
        .put('/api/galleries/' + this.testGallery._id)
        .send({caption: 'new gallery caption'})
        .end((err, res) => {
          expect(err).to.eql(null);
          expect(res).to.have.status(200);
          expect(res.body.msg).to.eql('Update Successful');
          done();
        });
    });

    it('should be able to delete a gallery', (done) => {
      chai.request('localhost:3000')
        .delete('/api/galleries/' + this.testGallery._id)
        .end((err, res) => {
          expect(err).to.eql(null);
          expect(res).to.have.status(200);
          expect(res.body.msg).to.eql('Successfully Deleted');
          done();
        });
    });
  });
});
