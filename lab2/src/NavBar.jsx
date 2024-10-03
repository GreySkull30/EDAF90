import { Link } from "react-router-dom";
import { NavLink } from "react-router-dom";
export default function Navbar() {
return (
<ul className="nav nav-tabs">
<li className="nav-item">
<NavLink className="nav-link" to="/compose-salad">
Compose Salad
</NavLink>
</li>
<li className="nav-item">
<NavLink className="nav-link" to="/view-order">
View Order
</NavLink>
</li>

<li className="nav-item">
<NavLink className="nav-link" to="/">
Main
</NavLink>
</li>


</ul>);
}