/* global describe, it, before */

import chai from 'chai';
import { Analyzer } from '../lib/thehive.js';

chai.expect();

const expect = chai.expect;

let analyzer;

describe('Given an instance of Analyzer class', () => {
  before(() => {
    analyzer = new Analyzer();
  });
  describe('when I need a summary', () => {
    it('should return an empty summary', () => {
      let summary = analyzer.summary();

      expect(summary).to.be.a('object');
      expect(summary).to.be.empty;
    });
  });

  describe('when I need an error', () => {
    it('should return an error message object', () => {
      let msg = 'Error Message';
      let error = analyzer.error(msg);

      expect(error).to.be.a('object');
      expect(error).to.have.property('success');
      expect(error).to.have.property('errorMessage');

      expect(error.success).to.be.a('boolean');
      expect(error.success).to.be.equal(false);

      expect(error.errorMessage).to.be.a('string');
      expect(error.errorMessage).to.be.equal(msg);
    });
  });

  describe('when I need a report', () => {
    it('should return a report object', () => {
      let data = {count: 1};
      let error = analyzer.report(data);

      expect(error).to.be.a('object');
      expect(error).to.have.property('success');
      expect(error).to.have.property('full');
      expect(error).to.have.property('summary');
      expect(error).to.have.property('artifacts');

      expect(error.success).to.be.a('boolean');
      expect(error.success).to.be.equal(true);

      expect(error.full).to.be.a('object');
      expect(error.full).to.be.equal(data);

      expect(error.summary).to.be.a('object');
      expect(error.artifacts).to.be.a('array');
    });
  });
});

// describe('Given an instance of my Dog analyzerrary', () => {
//   before(() => {
//     analyzer = new Dog();
//   });
//   describe('when I need the name', () => {
//     it('should return the name', () => {
//       expect(analyzer.name).to.be.equal('Dog');
//     });
//   });
// });
