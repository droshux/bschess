import { BS, Base_BS, Piece_BS, emptyBS } from '@lib/bs'
import { PieceCost } from '@lib/piececost'
import { Tuple } from '@lib/index'
import * as React from 'react'
import { BSrender } from '../components/bs'
import '../styles/create.css'
import { HttpStatus } from 'http-status-ts'

type createPagePROPS = {}
type createPageSTATE = {
  bs: BS
  bstype: "event" | "piece"
  limitPieces: boolean
  errorText?: string
}
type targetType = HTMLInputElement | HTMLTextAreaElement

export class CreatePage extends React.Component<createPagePROPS, createPageSTATE> {
  constructor(props: createPagePROPS) {
    super(props)
    this.state = { bs: emptyBS, bstype: "event", limitPieces: false }

    // Bind event listeners
    this.handleChange = this.handleChange.bind(this)
    this.handlePieceCostChange = this.handlePieceCostChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
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

      case "effect":
        this.setState({
          bs: {
            ...this.state.bs,
            effect: target.value
          }
        })
        break

      case "type":
        this.setState({bstype: target.value as 'event' | 'piece'})
        break

      case "move":
        this.setState({
          bs: {
            ...this.state.bs,
            move: target.value
          }
        })
        break

      case "take":
        this.setState({
          bs: {
            ...this.state.bs,
            take: target.value
          }
        })
        break

      case "lives":
        this.setState({
          bs: {
            ...this.state.bs,
            lives: parseInt(target.value)
          }
        })
        break

      default: break
    }

  }

  handlePieceCostChange(event: React.ChangeEvent) {
    // Get the element that was changed and the piececost pre-change
    const target: targetType = event.target as targetType
    const currentCost: PieceCost = this.state.bs.setup.cost

    let regCostTup: Tuple<number, 5> = currentCost.regular_cost
    let bsCostArr: string[] = currentCost.bspiece_cost

    if (target.id === "bspiece_cost")
      bsCostArr = target.value.split(/\r?\n/) // Change the bs cost
    else if (target.id === "limit_pieces")
      this.setState({ limitPieces: (target as HTMLInputElement).checked })
    else regCostTup[parseInt(target.id)] = parseInt(target.value) // Change one of the elements of the tuple

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

  private modalRef = React.createRef<HTMLDialogElement>()
  // private previewRef = React.createRef<HTMLDivElement>()

  handleSubmit(event: React.FormEvent) {
    const newBS: BS = this.state.bstype === 'event' ? 
      this.state.bs as Base_BS : this.state.bs

    fetch("/bss", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newBS)
    }).then(async res => {
        console.log(res.statusText)
        if (res.status != HttpStatus.CREATED) {
          console.log(await res.text())
          this.setState({errorText: "TEST TEXT"})
        } else this.setState({errorText: undefined})
        this.modalRef.current?.showModal()
      })
    event.preventDefault()
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
        min={0}
        max={this.state.limitPieces ? pieces[i].max : ""}
      /> {pieces[i].symb}
    </>)

    const currentBSCost: string[] = this.state.bs.setup.cost.bspiece_cost;
    out.push(<>
      <br></br>Any further pieces:
      <textarea
        id="bspiece_cost"
        value={currentBSCost.length == 0 ? "" : currentBSCost.reduce((p, c) => p + "\r\n" + c)}
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
      <form onSubmit={this.handleSubmit}>
        <label>Bullsh*t type:
          <select onChange={this.handleChange} value={this.state.bstype} id="type">
            <option value="event">Special Event</option>
            <option value="piece">Custom Piece</option>
          </select>
        </label>
        <label>Limit Pieces:
          <input type="checkbox" id="limit_pieces" onChange={this.handlePieceCostChange} checked={this.state.limitPieces} />
        </label>
        <label>Name: <input type="text" id="name" value={this.state.bs.name} onChange={this.handleChange} /></label>
        <label>Lore: <textarea id="lore" value={this.state.bs.lore} onChange={this.handleChange} /></label>
        <div>
          <div>
            <label>{this.genRegularPieceCostInputs()}</label>
          </div>
          <label> Setup: <textarea id="setup.extra" value={this.state.bs.setup.extra} onChange={this.handleChange} /></label>
        </div>
        <label>Effect: <textarea id="effect" value={this.state.bs.effect} onChange={this.handleChange}/></label>
        <div style={{
          display: this.state.bstype === 'piece' ? 'block' : 'none'
        }}>
          <label> Moves: <textarea id="move" value={(this.state.bs as Piece_BS).move} onChange={this.handleChange} /></label>
          <label> Takes: <textarea id="take" value={(this.state.bs as Piece_BS).take} onChange={this.handleChange} /></label>
          <label> Lives: <input type="number" id="lives" value={(this.state.bs as Piece_BS).lives} onChange={this.handleChange} min={1} defaultValue={1}/></label>
        </div>
        <input type='submit' value={"FINISH"} />
      </form>
      <h2>Preview:</h2>
      <BSrender bsid={-1} bs={this.state.bs}/>
      <dialog ref={this.modalRef}>
        <div style={{display: this.state.errorText == undefined ? 'block' : 'none'}}>
          <h2>Successfully Created Piece:</h2>
          <BSrender bsid={-1} bs={this.state.bs}/>
        </div>
        <div className='error' style={{display: this.state.errorText != undefined ? 'block' : 'none'}}>
          <h2>ERROR</h2>
          <p>{this.state.errorText}</p>
        </div>
      </dialog>
    </>)
  }
}
