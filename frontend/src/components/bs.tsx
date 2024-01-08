import { BS, isPiece, isPieceLOOSE } from '@lib/bs'
import { PieceCost } from '@lib/piececost'
import '../styles/bs.css'
import { FunctionComponent } from 'react'

type BSrenderPROPS = {
  bsid: number
  bs: BS
  allowLoose: boolean
}
const BSrender: FunctionComponent<BSrenderPROPS> = (props: BSrenderPROPS) =>
  <div className='bsbox'>
    <h3>{props.bs.name}</h3>
    <h6><em>ID: {props.bsid}</em></h6>
    <p>{props.bs.lore}</p>
    <div style={{
      display: (
        props.bs.setup.cost.regular_cost.reduce((p, n) => p + n) > 0 ||
        props.bs.setup.extra.length != 0
      ) ? 'inherit' : 'none'
    }}>
      <p><strong>{rebuildPieceCost(props).toString(true)}</strong></p>
      <p>{props.bs.setup.extra}</p>
    </div>
    {movesTakes(props)}
    <p>{props.bs.effect}</p>
  </div>

BSrender.defaultProps = { allowLoose: false }

const rebuildPieceCost = (props: BSrenderPROPS): PieceCost =>
  new PieceCost(
    false,
    ...props.bs.setup.cost.regular_cost,
    props.bs.setup.cost.bspiece_cost
  )

const movesTakes = (props: BSrenderPROPS): JSX.Element =>
  isPiece(props.bs) || (props.allowLoose && isPieceLOOSE(props.bs)) ?
    <>
      <p><em>Moves:</em> {props.bs.move}</p>
      <p><em>Takes:</em> {props.bs.take}</p>
      {props.bs.lives > 1 ? <p><em>Lives:</em> {props.bs.lives}</p> : <></>}
    </> : <></>

export { BSrender }
