  import {BS} from '@lib/index'

  type BSrenderPROPS = {
    bsid: number
    bs: BS
  }
  export const BSrender = (props: BSrenderPROPS): JSX.Element => {
    return (<>
      <h6>{props.bs.name}</h6>
      <p><em>ID: {props.bsid}</em></p>
      <p>{props.bs.lore}</p>
    </>)
}
