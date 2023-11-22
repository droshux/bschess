import {BS} from '@lib/index'
import '../styles/bs.css'

type BSrenderPROPS = {
  bsid: number
  bs: BS
}
export const BSrender = (props: BSrenderPROPS): JSX.Element =>
  <div className='bsbox'>
    <h3>{props.bs.name}</h3>
    <h6><em>ID: {props.bsid}</em></h6>
    <p>{props.bs.lore}</p>
  </div>
