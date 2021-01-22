type formatterJSON = <T = unknown>(value: T) => string
type transpileJSON = <T = unknown>(value: string) => T

export const formatterJSON: formatterJSON = value => JSON.stringify(value)
export const transpileJSON: transpileJSON = value => JSON.parse(value)
