import { BS } from '@lib/bs'
import { PieceCost } from '@lib/piececost'
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
    <div>
      <p>{rebuildPieceCost(props).toString(true)}</p>
      <p>{props.bs.setup.extra}</p>
    </div>
  </div>

const rebuildPieceCost = (props: BSrenderPROPS): PieceCost =>
  new PieceCost(
    false,
    props.bs.setup.cost.regular_cost[0],
    props.bs.setup.cost.regular_cost[1],
    props.bs.setup.cost.regular_cost[2],
    props.bs.setup.cost.regular_cost[3],
    props.bs.setup.cost.regular_cost[4],
    props.bs.setup.cost.bspiece_cost
  )
