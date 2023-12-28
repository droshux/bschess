import * as React from 'react'
import { CreateMenu } from '../components/createMenu'
import { HttpStatus } from 'http-status-ts'
import { emptyBS } from '@lib/bs'

type adminPagePROPS = {}
type adminPageSTATE = {
  selectedID: number,
  adminPWD: string
}

export class AdminPage extends React.Component<adminPagePROPS, adminPageSTATE> {
  constructor(props: adminPagePROPS) {
    super(props)

    this.state = {
      selectedID: 0,
      adminPWD: ""
    }
    
    // Bind event listeners
    this.handleSelectedIDChange = this.handleSelectedIDChange.bind(this)
    this.handleAdminPWDChange = this.handleAdminPWDChange.bind(this)
  }

  private menuRef = React.createRef<CreateMenu>()

  handleSelectedIDChange(event: React.ChangeEvent) {
    const id: number = parseInt((event.target as HTMLInputElement).value)
    this.setState({ selectedID: id })
    console.log(this.state.adminPWD)

    fetch(`/bss/${id}`, {
      method: "GET",
      headers: {"Content-Type": "application/json"}
    }).then(async res => {
        this.menuRef.current?.setState({ bs: 
          res.ok ? await res.json() : emptyBS
        })
      })
  }

  handleAdminPWDChange(event: React.ChangeEvent) {
    const pwd: string = (event.target as HTMLInputElement).value
    this.setState({adminPWD: pwd})
  }

  render(): React.ReactNode {
    return <>
      <h1>Secret Admin Page UwU!</h1><br/>
      <input type='number' id='selectedID' onChange={this.handleSelectedIDChange} value={this.state.selectedID}/>
      <input type='text' id='adminPWD' onChange={this.handleAdminPWDChange} value={this.state.adminPWD}/>
      <CreateMenu ref={this.menuRef} successCodes={[HttpStatus.OK, HttpStatus.CREATED]} route={`/bss/${this.state.selectedID}?pwd=${this.state.adminPWD}`} method='PUT' />
    </>
  }
}
