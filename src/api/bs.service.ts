import { BS } from "./bs.js"
import { regularPiece,  } from "../piececost.js"

export type BSstore = {[id: number]: BS}
let BSs: BSstore = {
  1: {
    name: "Test Event",
    lore: "Test Lore",
    setup: {
      cost: regularPiece("pawn"),
      extra: ""
    },
    effect: "Test Effect"
  },
  2: {
    name: "Test Piece",
    lore: "Test Lore 2",
    setup: {
      cost: regularPiece("pawn"),
      extra: ""
    },
    effect: "Test Effect 2",
    move: "Like a pawn",
    take: "[move]",
    lives: 1
  }
}

export const create = async (nbs: BS): Promise<BS> => {
  // One more than the largest ID (⌈/⍕¨)Object.keys(BSs)
  const newID: number = Object.keys(BSs)
    .map((a: string) => +a) 
    .reduce((a: number, b: number) => Math.max(a, b))+1

  BSs[newID] = nbs
  return BSs[newID]
}
export const findall = async (): Promise<BS[]> => Object.values(BSs)
export const find = async (id: number): Promise<BS> => BSs[id]
export const update = async (id: number, ubs: BS) => {
  if (!await find(id)) return null
  BSs[id] = ubs;
  return BSs[id];
}
export const remove = async (id: number): Promise<null | void> => {
  if (!await find(id)) return null
  delete BSs[id]
}
