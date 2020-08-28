import {expect} from 'chai'
import {DomainStripper} from '../src/URIStripper'
import {PathStripper} from '../src/URIStripper'
import {ProtocolStripper} from '../src/URIStripper'

describe('URIStrip.ts', () => {
  it('should strip domain', () => {
    const domainStripper = new DomainStripper()
    expect(domainStripper.strip('http://www.auritylab.com/this/is/a/path')).to.equal("www.auritylab.com")
    expect(domainStripper.strip('https://test-subdomain.auritylab.com')).to.equal("test-subdomain.auritylab.com")
    expect(domainStripper.strip('test-subdomain.auritylab.com')).to.equal("test-subdomain.auritylab.com")
  })

  it('should strip path', () => {
    const pathStripper = new PathStripper()
    expect(pathStripper.strip('http://www.auritylab.com/this/is/a/path')).to.equal("/this/is/a/path")
    expect(pathStripper.strip('www.auritylab.com/this/is/a/path')).to.equal("/this/is/a/path")
    expect(pathStripper.strip('www.auritylab.com')).to.be.null;
  })

  it('should strip protocol', () => {
    const protocolStripper = new ProtocolStripper()
    expect(protocolStripper.strip('http://www.auritylab.com/this/is/a/path')).to.equal("http://")
    expect(protocolStripper.strip('file://Home/Users/username/file')).to.equal("file://")
    expect(protocolStripper.strip('www.auritylab.com/')).to.be.null;
  })
})
