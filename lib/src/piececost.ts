export class PieceCost {
  public regular_cost:number[] = new Array(5)
  public bspiece_cost:string[] = []

  /**
   * @param [clamp=true] Are the input values limited to the max number of
   * that piece per board.
   * @param other Any non-regular pieces or the opponent's pieces ("enemy pawn"
   * or "Juan")
   */
  constructor(clamp: boolean = true,
    pawns: number, horses: number, bishops: number, rooks: number, queens: number, 
    other: string[]) {

    // Create a function to validate inputs
    const v = (x: number, m: number): number => 
      clamp ? Math.max(Math.min(Math.round(x), m), 0) : Math.round(x)

    this.regular_cost[0] = v(pawns, 8)
    this.regular_cost[1] = v(horses, 2)
    this.regular_cost[2] = v(bishops, 2)
    this.regular_cost[3] = v(rooks, 2)
    this.regular_cost[4] = v(queens, 1)

    this.bspiece_cost = other
  }


  public toString = (symbols: boolean = false): string => {
    const nameArr: string[] = symbols ? ['♟','♞','♝','♜','♛'] : ["pawn", "horse", "bishop", "rook", "queen"]
    let stringOut: string = "";

    for (let i = 0; i < this.regular_cost.length; i++) {
      const elem: number = this.regular_cost[i];
      if (elem == 0) continue;
      stringOut += elem > 1 ? `${elem} ${nameArr[i]}s ` : `${nameArr[i]} `
    }
    this.bspiece_cost.forEach(elem => stringOut += `${elem} `)
    return stringOut.trimEnd()
  }

}

export function regularPiece (
  regpiece: "pawn" | "horse" | "bishop" | "rook" | "queen"
): PieceCost {
  switch (regpiece) {
    case "pawn":
      return new PieceCost(true, 1, 0, 0, 0, 0, [])
    case "horse":
      return new PieceCost(true, 0, 1, 0, 0, 0, [])
    case "bishop":
      return new PieceCost(true, 0, 0, 1, 0, 0, [])
    case "rook":
      return new PieceCost(true, 0, 0, 0, 1, 0, [])
    case "queen":
      return new PieceCost(true, 0, 0, 0, 0, 1, [])
    default:
      return new PieceCost(true, 0, 0, 0, 0, 0, [])
  }
}
