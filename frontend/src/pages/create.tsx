import { BS, emptyBS } from '@lib/bs'
import { PieceCost } from '@lib/piececost'
import * as React from 'react'

type createPagePROPS = {}
type createPageSTATE = {
  bs: BS
  bstype: "event" | "piece"
  limitPieces: boolean
}
type targetType = HTMLInputElement | HTMLTextAreaElement

export class CreatePage extends React.Component<createPagePROPS, createPageSTATE> {
  constructor(props: createPagePROPS) {
    super(props)
    this.state = {bs: emptyBS, bstype: "event", limitPieces: false}

    // Bind event listeners
    this.handleChange = this.handleChange.bind(this)
    this.handlePieceCostChange = this.handlePieceCostChange.bind(this)
  }

  handleChange(event: React.ChangeEvent) {
    const target: targetType = event.target as targetType

    switch (target.id) {

      case "name":
        this.setState({
          bs: {
            ...this.state.bs,
            name: target.value
          }
        })
        break

      case "lore":
        this.setState({
          bs: {
            ...this.state.bs,
            lore: target.value
          }
        })
        break

      case "setup.extra":
        this.setState({
          bs: {
            ...this.state.bs,
            setup: {
              ...this.state.bs.setup,
              extra: target.value
            }
          }
        })
        break

      default:
        break
    }

  }

  handlePieceCostChange(event: React.ChangeEvent) {
    // Get the element that was changed and the piececost pre-change
    const target: targetType = event.target as targetType
    const currentCost: PieceCost = this.state.bs.setup.cost

    // Store the piececost pre-change into a tuple
    let regCostTup: [
      number, number, number, number, number
    ] = [
      currentCost.regular_cost[0],
      currentCost.regular_cost[1],
      currentCost.regular_cost[2],
      currentCost.regular_cost[3],
      currentCost.regular_cost[4]
    ]
    let bsCostArr: string[] = currentCost.bspiece_cost

    // TODO: make this not bad by replacing piececost's regular pieces with a
    // tuple

    if (target.id === "bspiece_cost")
      // Change the bs cost
      bsCostArr = target.value.split(/\r?\n/)
    // Change one of the elements of the tuple
    else regCostTup[parseInt(target.id)] = parseInt(target.value)

    // Update the bs with a new PieceCost
    this.setState({
      bs: {
        ...this.state.bs,
        setup: {
          ...this.state.bs.setup,
          cost: new PieceCost(
            this.state.limitPieces,
            ...regCostTup, // Using a tuple allows us to do this
            bsCostArr
          )
        }
      }
    })
  }

  genRegularPieceCostInputs(): JSX.Element[] {
    let out: JSX.Element[] = []
    type pCost = {
      symb: string
      max: number
    }
    const pieces: pCost[] = [
      { symb: "♟", max: 8 },
      { symb: "♞", max: 2 },
      { symb: "♝", max: 2 },
      { symb: "♜", max: 2 },
      { symb: "♛", max: 1 },
    ]

    for (let i = 0; i < 5; i++) out.push(<>
      <input
        type="number"
        id={i.toString()}
        value={this.state.bs.setup.cost.regular_cost[i]}
        onChange={this.handlePieceCostChange}
        key={i}
      /> {pieces[i].symb}
    </>)

    const currentBSCost: string[] = this.state.bs.setup.cost.bspiece_cost;
    out.push(<>
      <br></br>Any further pieces:
      <textarea 
        id="bspiece_cost" 
        value={currentBSCost.length == 0 ? "" : currentBSCost.reduce((p,c)=>p+"\r\n"+c)}
        onChange={this.handlePieceCostChange}
        key="BS"
      />
      (One per line)
    </>)

    return out
  }

  render(): React.ReactNode {
    return (<>
      <h1>Create:</h1>
      <form>
        <label>Bullsh*t type:
          <select>
            <option value="event">Special Event</option>
            <option value="piece">Custom Piece</option>
          </select>
        </label>
        <label> Name: <input type="text" id="name" value={this.state.bs.name} onChange={this.handleChange}/></label>
        <label> Lore: <textarea id="lore" value={this.state.bs.lore} onChange={this.handleChange}/></label>
        <div>
          <div>
            <label>{this.genRegularPieceCostInputs()}</label>
          </div>
          <label> Setup: <textarea id="setup.extra" value={this.state.bs.setup.extra} onChange={this.handleChange}/></label>
        </div>
      </form>
    </>)
  }
}
