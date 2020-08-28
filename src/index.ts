import {MultiPatternMatcher} from './MultiPatternMatcher'
import {SimpleDomainPattern} from './SimpleDomainPattern'
import {SimplePathPattern} from './SimplePathPattern'
import {SimpleProtocolPattern} from './SimpleProtocolPattern'
import { DomainStripper } from './URIStripper'

/**
 * Matches the given input against the given patterns.
 *
 * @param input to match against.
 * @param patterns to match the input against.
 * @return If the given input matches on of the given patterns.
 */
export function match(input: string, ...patterns: string[]): boolean {
  const matcher = new MultiPatternMatcher(new DomainStripper())
  patterns.forEach((pattern) => {
    matcher.registerPattern(new SimpleDomainPattern(pattern))
  })

  return matcher.match(input).matches()
}

export {MultiPatternMatcher, SimpleDomainPattern, SimplePathPattern, SimpleProtocolPattern}
