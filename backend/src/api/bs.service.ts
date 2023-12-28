import { BS, regularPiece, BSstore } from "@lib/index"
import { readFileSync, writeFileSync } from "fs"

let BSs: BSstore = {}
const maxID = (): number => Object.keys(BSs)
  .map((a: string) => +a)
  .reduce((a: number, b: number) => Math.max(a, b))
const minID = (): number => Object.keys(BSs)
  .map((a: string) => +a)
  .reduce((a: number, b: number) => Math.min(a, b))

export const create = async (nbs: BS, id?: number): Promise<BS> => {
  // One more than the largest ID (⌈/⍕¨)Object.keys(BSs)
  const newID: number =  id != undefined ? id : maxID()+1

  BSs[newID] = nbs
  return BSs[newID]
}
export const findall = async (): Promise<BSstore> => BSs
// export const findall = async (): Promise<BS[]> => Object.values(BSs)
export const find = async (id: number): Promise<BS> => BSs[id]
export const update = async (id: number, ubs: BS): Promise<BS | null> => {
  if (!await find(id)) return null
  BSs[id] = ubs;
  return BSs[id];
}
export const remove = async (id: number): Promise<null | void> => {
  if (!await find(id)) return null
  delete BSs[id]
}
export const draw = async (count: number): Promise<BS[] | null> => {
  if (count > Object.keys(BSs).length) return null
  const rnd = (a: number, b: number): number => 
    Math.floor(Math.random() * (b - a) + a)
  let outIndexes: number[] = []
  let addIndex: number
  do {
    addIndex = +Object.keys(BSs)[rnd(0, Object.keys(BSs).length)]
    if (!outIndexes.includes(addIndex)) outIndexes.push(addIndex)
  } while (outIndexes.length < count);
  let out: BS[] = []
  outIndexes.forEach((i: number) => out.push(BSs[i]))
  return out;
}
export const save = async (): Promise<void> =>
  // JSON.stringify could be replaced with a stream when BSs is too big.
  writeFileSync('./session/bss.json', JSON.stringify(BSs))
export const load = async (): Promise<void> => 
  BSs = JSON.parse(readFileSync("./session/bss.json", "utf8"))
