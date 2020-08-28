import {expect} from 'chai'
import {SimplePathPattern} from '../src/SimplePathPattern'

describe('SimplePathPattern.ts', () => {
  it('should match simple pattern', () => {
    const pattern = new SimplePathPattern('edit-password').getPattern()

    expect(pattern.test('www.auritylab.com/edit-password')).to.be.true
    expect(pattern.test('www.auritylab.com/api/edit-password')).to.be.true
    expect(pattern.test('www.auritylab.com/api/edit-password/1')).to.be.true
    expect(pattern.test('auritylab.com/edit-account')).to.be.false
    expect(pattern.test('test.www.auritylab.com')).to.be.false
  })

  it('should match advanced pattern', () => {
    const pattern = new SimplePathPattern('edit/password').getPattern()

    expect(pattern.test('www.auritylab.com/edit/password')).to.be.true
    expect(pattern.test('www.auritylab.com/edit-password')).to.be.false
    expect(pattern.test('www.auritylab.com/edit/uuid/password')).to.be.false
    expect(pattern.test('www.auritylab.com/api/edit/1')).to.be.false
    expect(pattern.test('www.auritylab.com/api/password/1')).to.be.false
    expect(pattern.test('test.www.auritylab.com')).to.be.false
  })

  it('should match mixed pattern', () => {
    const pattern = new SimplePathPattern('edit*password').getPattern()

    expect(pattern.test('www.auritylab.com/edit/password')).to.be.true
    expect(pattern.test('www.auritylab.com/edit-password')).to.be.true
    expect(pattern.test('www.auritylab.com/edit/uuid/password')).to.be.true
    expect(pattern.test('www.auritylab.com/api/edit/1')).to.be.false
    expect(pattern.test('www.auritylab.com/api/password/1')).to.be.false
    expect(pattern.test('test.www.auritylab.com')).to.be.false
  })

  it('should throw exception on query params', () => {
    expect(() => {
      const pattern = new SimplePathPattern('?key=param')
    }).to.throw()
  })

  it('should throw exception on protocol', () => {
    expect(() => {
      const pattern = new SimplePathPattern('http://')
    }).to.throw()
  })

  it ('should handle global wildcard', () => {
    const pattern = new SimplePathPattern('*').getPattern()

    expect(pattern.test('edit-password')).to.be.true
    expect(pattern.test('edit')).to.be.true
    expect(pattern.test('edit/password')).to.be.true
  })
})
