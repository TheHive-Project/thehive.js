/* global describe, it, before */

import chai from 'chai';
import {Case} from '../lib/thehive.js';

chai.expect();

const expect = chai.expect;

let lib;

describe('Given an empty Case config', () => {
  // before(() => {
  //   lib = new Analyzer();
  // });
  describe('when I create a Case', () => {
    it('should return a Case with default values', () => {
      let caze = new Case({});

      expect(caze).to.be.a('object');
      expect(caze).to.not.be.empty;
      expect(caze.title).to.equal(null)
      expect(caze.description).to.equal(null)
      expect(caze.tlp).to.equal(2)
      expect(caze.severity).to.equal(2)
      expect(caze.flag).to.equal(false)
      expect(caze.tags).to.be.empty
      expect(caze.metrics).to.be.empty
      expect(caze.tasks).to.be.empty
      expect(caze.startDate).to.not.be.empty
      expect(caze.startDate).to.be.a('number')
    });
  });
});
