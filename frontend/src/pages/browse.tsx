import * as React from 'react'
import { BSstore} from '@lib/index'
import { BSrender } from '../components/bs'
// export const BrowsePage = () => <h1>Browse Bullsh*ts:</h1>

type BrowsePageSTATE = {
  bss: BSstore
}
type BrowsePagePROPS = {}
export class BrowsePage extends React.Component<BrowsePagePROPS, BrowsePageSTATE> {

  refresh = async (): Promise<BSstore | null> => {
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
  }
  componentDidMount(): void {
    this.refresh().then((o: BSstore | null) => {
      if (!o) console.error("REFRESH FAILED")
      else this.setState({bss: o})
    })
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
      <button>REFRESH</button>
      {bssElems}
    </>)
  }
}
