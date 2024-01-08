import * as React from 'react'
import { CreateMenu } from '../components/createMenu'
import { HttpStatus } from 'http-status-ts'
import { emptyBS } from '@lib/bs'
import { cyrb53, isEmpty} from '@lib/index'

type adminPagePROPS = {}
type adminPageSTATE = {
  selectedID: number,
  adminPWD: string
}

const saveShutdown: string = "SHUTDOWN SAVE"
const noSaveShutdown: string = "SHUTDOWN NO SAVE"

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
    this.handleDeleteButtonPress = this.handleDeleteButtonPress.bind(this)
    this.handleShutdownButtonPress = this.handleShutdownButtonPress.bind(this)
  }

  // Trigger the preview 
  componentDidMount(): void {
    this.handleSelectedIDChange("INIT")
  }

  private menuRef = React.createRef<CreateMenu>()

  handleSelectedIDChange(event: React.ChangeEvent | "INIT") {
    const id: number = event == "INIT" ? 1 : parseInt(
      (event.target as HTMLInputElement).value
    )
    this.setState({ selectedID: id })

    fetch(`/bss/${id}`, {
      method: "GET",
      headers: {"Content-Type": "application/json"}
    }).then(async res =>
        this.menuRef.current?.setState({ bs: 
          res.ok ? await res.json() : emptyBS
        })
      )
  }

  handleAdminPWDChange(event: React.ChangeEvent) {
    const pwd: string = (event.target as HTMLInputElement).value
    this.setState({adminPWD: pwd})
  }

  async handleDeleteButtonPress() {
    // Check if the BS exists
    console.log("DELETING!")
    let bsExists: boolean = false
    await fetch(`/bss/${this.state.selectedID}`, {
      method: "GET",
      headers: {"Content-Type": "application/json"}
    }).then(async res => bsExists = res.ok)
    if (!bsExists) return

    // Delete BS
    let pres: Promise<Response> = fetch(`/bss/${this.state.selectedID}?pwd=${cyrb53(this.state.adminPWD).toString()}`, {
      method: "DELETE",
      headers: {"Content-Type": "application/json"}
    })
    pres.then(async res => {
      if (res.status == HttpStatus.NO_CONTENT)
        alert("BS deleted successfully.")
      else alert(await res.text())
    })
  }

  handleShutdownButtonPress(event: React.MouseEvent) {

    // Set stuff up, for shutting down the backend
    const id: string = (event.target as HTMLButtonElement).id
    const successMsg = id === noSaveShutdown ? 
      "Backend shutdown successfully. No data was saved." :
      "Data saved and backend shutdown successfully."

    // Shutdown the backend!!
    fetch(
      `/sys/quit${id === noSaveShutdown ? "_unsafe" : ""}?pwd=${cyrb53(this.state.adminPWD).toString()}`,
      { "method": "GET" }
    ).then(async res => {
        const errorText = await res.text()
        alert(res.ok || isEmpty(errorText) ? successMsg : errorText)
      })
  }

  render(): React.ReactNode {
    return <>
      <h1>Secret Admin Page UwU!</h1><br/>
      <input type='number' id='selectedID' onChange={this.handleSelectedIDChange} value={this.state.selectedID}/>
      <input type='password' id='adminPWD' onChange={this.handleAdminPWDChange} value={this.state.adminPWD}/>
      <CreateMenu ref={this.menuRef} successCodes={[HttpStatus.OK, HttpStatus.CREATED]} route={`/bss/${this.state.selectedID}?pwd=${cyrb53(this.state.adminPWD).toString()}`} method='PUT' />
      <button id='deletebutton' onClick={this.handleDeleteButtonPress}>DELETE</button>
      <br/>
      <button id={saveShutdown} onClick={this.handleShutdownButtonPress}>SHUTDOWN</button>
      <button id={noSaveShutdown} onClick={this.handleShutdownButtonPress}>SHUTDOWN (NO SAVE)</button>
    </>
  }
}
