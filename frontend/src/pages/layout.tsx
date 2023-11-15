import { Link, Outlet } from "react-router-dom";

export const Layout = () => (<>
  <nav>
    <ul>
      <li>
        <Link to="/">Home</Link>
      </li>
      <li>
        <Link to="/learn">Learn to play!</Link>
      </li>
      <li>
        <Link to="/rules">"Formal" rules.</Link>
      </li>
      <li>
        <Link to="/browse">Browse Bullsh*ts</Link>
      </li>
      <li>
        <Link to="/create">Create a Bullsh*t</Link>
      </li>
    </ul>
  </nav>
  <Outlet/>
</>)
