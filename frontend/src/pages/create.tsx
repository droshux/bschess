import '../styles/create.css'
import { CreateMenu } from '../components/createMenu'
import { HttpStatus } from 'http-status-ts'

export const CreatePage = () => <>
  <h1>Create</h1>
  <CreateMenu route={"/bss/"} method={'POST'} successCodes={[HttpStatus.CREATED]}/>
</>
