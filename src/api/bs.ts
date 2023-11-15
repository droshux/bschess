// The structure of a BS
import { PieceCost } from "../piececost.js";

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

export type BS = Base_BS | Piece_BS
// export type BS = Partial<Piece_BS>
