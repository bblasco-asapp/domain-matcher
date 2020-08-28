import {IMatcherResult} from './api/IMatcherResult'
import {IModifiableMatcher} from './api/IModifiableMatcher'
import {IPattern} from './api/IPattern'
import {SimpleMatcherResult} from './SimpleMatcherResult'
import { IURLStripper } from './URIStripper'

export class MultiPatternMatcher implements IModifiableMatcher {
  private patterns: IPattern[] = []
  private uriStripper: IURLStripper

  constructor(uriStripper:IURLStripper) {
    this.uriStripper = uriStripper;
  }

  public match(input: string): IMatcherResult {
    const stripped = this.uriStripper.strip(input)
    if (stripped === null)
      throw new Error('Input "' + input + '" invalid')

    let matchingPattern: IPattern = null
    this.patterns.forEach((pattern) => {
      if (pattern.getPattern().test(stripped))
        matchingPattern = pattern
    })

    if (matchingPattern === null)
      return new SimpleMatcherResult(false, null)
    else
      return new SimpleMatcherResult(true, matchingPattern)
  }

  public registerPattern(pattern: IPattern): void {
    this.patterns.push(pattern)
  }
}
