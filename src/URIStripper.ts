
export interface IURLStripper {
    strip(input: String): string;
}

export class DomainStripper implements IURLStripper {
    strip(input: string): string {
        const regexp = /^(https?:\/\/)?([^/]*)(\/?)/gm
        const ex = regexp.exec(input)
        if (ex === null)
            return null

        return ex[2]
    }
}

export class ProtocolStripper implements IURLStripper {
    strip(input: string): string {
        const regexp = /^(.+\:\/\/).+/gm
        const ex = regexp.exec(input)
        if (ex === null)
            return null
        return ex[1]
    }
}

export class PathStripper implements IURLStripper {
    strip(input: string): string {
        const regexp = /^(https?:\/\/)?([^/]*)(\/.+)/gm
        const ex = regexp.exec(input)
        if (ex === null)
            return null
        return ex[3]
    }
}