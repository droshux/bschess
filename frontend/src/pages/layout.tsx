import { Link, Outlet } from "react-router-dom";

export const Layout = () => (<>
  <Outlet/>
  <div className='navmenu'>
    <p>♚ MENU ♚</p>
    <nav>
          <Link to="/">♜ Home</Link>
          <Link to="/learn">♟ Learn to play!</Link>
          <Link to="/rules">♝ "Formal" rules.</Link>
          <Link to="/browse">♞ Browse Bullsh*ts</Link>
          <Link to="/create">♛ Create a Bullsh*t</Link>
    </nav>
  </div>
</>)
