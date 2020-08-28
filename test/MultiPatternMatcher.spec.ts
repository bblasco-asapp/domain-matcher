import {expect} from 'chai'
import {MultiPatternMatcher} from '../src/MultiPatternMatcher'
import {SimpleDomainPattern} from '../src/SimpleDomainPattern'
import {SimplePathPattern} from '../src/SimplePathPattern'
import { DomainStripper, PathStripper, ProtocolStripper } from '../src/URIStripper'

describe('MultiPatternMatcher.ts', () => {
  it('should match through multiple domain patterns', () => {
    const matcher = new MultiPatternMatcher(new DomainStripper())

    const pattern01 = new SimpleDomainPattern('*.auritylab.com')
    const pattern02 = new SimpleDomainPattern('*.test.com')

    matcher.registerPattern(pattern01)
    matcher.registerPattern(pattern02)

    const matchResult01 = matcher.match('test.auritylab.com')
    expect(matchResult01.matches()).to.be.true
    expect(matchResult01.getPattern()).to.equal(pattern01)

    const matchResult02 = matcher.match('test.test.com')
    expect(matchResult02.matches()).to.be.true
    expect(matchResult02.getPattern()).to.equal(pattern02)
  })

  it('should match through multiple path patterns', () => {
    const matcher = new MultiPatternMatcher(new PathStripper())

    const pattern01 = new SimplePathPattern("private")
    const pattern02 = new SimplePathPattern('edit*password')

    matcher.registerPattern(pattern01)
    matcher.registerPattern(pattern02)

    const matchResult01 = matcher.match('test.auritylab.com/private/path')
    expect(matchResult01.matches()).to.be.true
    expect(matchResult01.getPattern()).to.equal(pattern01)

    const matchResult02 = matcher.match('test.test.com/edit-password/uuid')
    expect(matchResult02.matches()).to.be.true
    expect(matchResult02.getPattern()).to.equal(pattern02)
  })

  it('should match through multiple protocol patterns', () => {
    const matcher = new MultiPatternMatcher(new ProtocolStripper())

    const pattern01 = new SimplePathPattern("http*")
    const pattern02 = new SimplePathPattern('file')

    matcher.registerPattern(pattern01)
    matcher.registerPattern(pattern02)

    const matchResult01 = matcher.match('https://test.auritylab.com/')
    expect(matchResult01.matches()).to.be.true
    expect(matchResult01.getPattern()).to.equal(pattern01)

    const matchResult02 = matcher.match('file://Home/Users/my/path')
    expect(matchResult02.matches()).to.be.true
    expect(matchResult02.getPattern()).to.equal(pattern02)
  })


})
