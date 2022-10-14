import * as sinon from 'sinon';
import * as chai from 'chai';
import * as sinonChai from 'sinon-chai';

import sortByPriority from '../utils/sort-number-by-priority';

const { expect } = chai;
chai.use(sinonChai);

describe('sortByPriority', () => {
  it('should return a number when two arrays with same length is received', () => {
    const priorityA = [3, 4, 1, 9];
    const priorityB = [9, 1, 4, 3];

    expect(sortByPriority(priorityA, priorityB)).to.be.equal(-6);
  });

  it('should go to the next priority value when the previous result get zero', () => {
    const priorityA = [3, 8];
    const priorityB = [3, 3];

    expect(sortByPriority(priorityA, priorityB)).to.be.equal(5);
  });

  it('should return 1 when after all operations the array lengths reach 0', () => {
    const priorityA = [3, 4];
    const priorityB = [3, 4];

    expect(sortByPriority(priorityA, priorityB)).to.be.equal(1);
  });

  it('should throw an error when arrays params are not same size', () => {
    const priorityA = [3, 4, 1];
    const priorityB = [9, 1, 4, 3];

    expect(() => {
      return sortByPriority(priorityA, priorityB)
    }).to.throw()
      .to.have.deep.property('message', 'Priority arrays lenght must be equals');
  });
});
