// test/api.test.js

const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const { describe, it } = require('mocha'); 
const app = require('../app'); 
const Note = require('../schemas/note.schema');
const User = require('../schemas/user.schema');

chai.use(chaiHttp);
const expect = chai.expect;

describe('API Tests', () => {
  // Assuming you have valid tokens for testing
  const validToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmaXJzdF9uYW1lIjoiYWJjIiwiaWQiOjEsImVtYWlsIjoiYWJjQHRlc3QuY29tIiwiaWF0IjoxNzA0MjgyMjA2fQ.Y3S2W9bLCH9lcmmrLCrWLP0qZu6KkJ1auWenZWQF6WA';


  const sampleNoteData = {
    user_id: 1,
    note: 'Test note content',
  };

  let createdNoteId;

  // Test case for /api/notes (createNote)
  describe('POST /api/notes', () => {
    it('should create a new note', (done) => {
      chai.request(app)
        .post('/api/notes')
        .set('Authorization', validToken)
        .send(sampleNoteData)
        .end((err, res) => {
          expect(res).to.have.status(201);
          expect(res.body.success).to.equal(true);
          expect(res.body.data).to.have.property('id');
          createdNoteId = res.body.data.id;
          done();
        });
    });

    it('should return an error for missing fields', (done) => {
      chai.request(app)
        .post('/api/notes')
        .set('Authorization', validToken)
        .send({ user_id: 1 })
        .end((err, res) => {
          expect(res).to.have.status(500);
          expect(res.body.success).to.equal(false);
          expect(res.body.message).to.equal('fill all required fields!');
          done();
        });
    });
  });

  // Test case for /api/search (searchNote)
  describe('GET /api/search', () => {
    it('should return notes matching the search query', (done) => {
      chai.request(app)
        .get('/api/search?q=Test')
        .set('Authorization', validToken)
        .end((err, res) => {
          expect(res).to.have.status(200);
          expect(res.body.success).to.equal(true);
          expect(res.body.data).to.be.an('array');
          done();
        });
    });

    it('should return an error for missing query parameter', (done) => {
      chai.request(app)
        .get('/api/search')
        .set('Authorization', validToken)
        .end((err, res) => {
          expect(res).to.have.status(500);
          expect(res.body.success).to.equal(false);
          expect(res.body.message).to.equal('query is required!');
          done();
        });
    });
  });

});
