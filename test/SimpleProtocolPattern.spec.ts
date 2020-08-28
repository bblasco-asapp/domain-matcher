import {expect} from 'chai'
import {SimpleProtocolPattern} from '../src/SimpleProtocolPattern'

describe('SimpleProtocolPattern.ts', () => {
  it('should match simple pattern', () => {
    const pattern = new SimpleProtocolPattern('http://').getPattern()

    expect(pattern.test('http://')).to.be.true
    expect(pattern.test('file://')).to.be.false
    expect(pattern.test('https://')).to.be.false
    expect(pattern.test('noprotocol')).to.be.false
  })

  it('should match advanced pattern', () => {
    const pattern = new SimpleProtocolPattern('*').getPattern()

    expect(pattern.test('http://')).to.be.true
    expect(pattern.test('https://')).to.be.true
    expect(pattern.test('file://')).to.be.true
    expect(pattern.test('noprotocol')).to.be.false
  })

  it('should match mixed pattern', () => {
    const pattern = new SimpleProtocolPattern('http*://').getPattern()

    expect(pattern.test('http://')).to.be.true
    expect(pattern.test('https://')).to.be.true
    expect(pattern.test('file://')).to.be.false
    expect(pattern.test('noprotocol')).to.be.false
  })

  it('should throw exception on invalid pattern', () => {
    expect(() => {
      const pattern = new SimpleProtocolPattern('noprotocol')
    }).to.throw()
  })

})
