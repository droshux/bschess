export * from './bs'
export * from './piececost'

// n-Tuple type alias
export type Tuple<T, N extends number, A extends any[] = []> = 
  A extends { length: N } ? A : Tuple<T, N, [...A, T]>
