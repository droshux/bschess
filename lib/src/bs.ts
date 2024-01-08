// The structure of a BS
import { PieceCost, regularPiece } from "./piececost"
import { isEmpty } from "./index"

export interface Base_BS {
  name: string // The name of the BS
  lore: string // The justification of the BS
  setup: Setup // The setup required to activate the BS
  effect: string // What does the BS do?
}

export interface Setup {
  cost: PieceCost, // The pieces that must be used in it's construction
  extra: string // Any other setup requirements eg: "wait 2 turns"
}

export interface Piece_BS extends Base_BS {
  move: string // eg: "Like a rook but can jump over pieces"
  take: string // eg: [moves] or like a bishop
  lives: number // eg: 2 (1 is the default) 
}

export const isPiece = (bs: any): bs is Piece_BS =>
  bs && 
  bs.move && typeof bs.move == 'string' && !isEmpty(bs.move) && 
  bs.take && typeof bs.take == 'string' && !isEmpty(bs.take) &&
  bs.lives && typeof bs.lives == 'number'

export const isPieceLOOSE = (bs: any): boolean =>
  bs && (
    (bs.move && typeof bs.move == 'string' && !isEmpty(bs.move)) ||
    (bs.take && typeof bs.take == 'string' && !isEmpty(bs.take)) ||
    (bs.lives && typeof bs.lives == 'number')
  )

export type BS = Base_BS | Piece_BS
export type BSstore = {[id: number]: BS}


export const emptyBS = {
      name: "",
      lore: "",
      setup: {
        cost: regularPiece("pawn"),
        extra: ""
      },
      effect: ""
    }
