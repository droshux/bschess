import * as React from 'react'
import {BS} from '@lib/index'
// export const BrowsePage = () => <h1>Browse Bullsh*ts:</h1>

type BrowsePageSTATE = {
  bss: BS[]
}
export class BrowsePage extends React.Component<{}, BrowsePageSTATE> {

  

  render(): React.ReactNode {
    return (<h1>Browse Bullsh*ts:</h1>)
  }
}
