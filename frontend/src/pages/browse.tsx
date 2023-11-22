import * as React from 'react'
import { BSstore} from '@lib/index'
import { BSrender } from '../components/bs'

type BrowsePageSTATE = {
  bss: BSstore
}
type BrowsePagePROPS = {}
export class BrowsePage extends React.Component<BrowsePagePROPS, BrowsePageSTATE> {

  fetchBSs = async (): Promise<BSstore | null> => {
    let out: BSstore | null = null
    await fetch(`/bss`, {
      headers: {
        "Accepts": "application/json",
      }
    })
      .then((res: Response) => res.json())
      .then(json => { out = json })
    return out
  }

  constructor(props: BrowsePagePROPS) {
    super(props)
    this.state = {bss: {}}
    this.refresh = this.refresh.bind(this)
  }

  refresh = () =>
    this.fetchBSs().then((o: BSstore | null) => {
      if (!o) console.error("REFRESH FAILED")
      else this.setState({bss: o})
    })

  componentDidMount(): void {
    this.refresh()
  }

  render(): React.ReactNode {
    let bssElems: JSX.Element[] = []
    if (Object.keys(this.state.bss).length > 0)
      Object.keys(this.state.bss).map(k => +k)
        .forEach((id: number) => bssElems.push(
          <BSrender bsid={id} bs={this.state.bss[id]} key={id}/>
        ))
    return (<>
      <h1>Browse Bullsh*ts:</h1>
      <button className='refresh' onClick={this.refresh}>♗ REFRESH ♗</button>
      <div>
        <div className='bssContainer'>{bssElems}</div>
      </div>
    </>)
  }
}
