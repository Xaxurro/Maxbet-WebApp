// import logo from "../Assets/NoEstamosListos.png"
import "../Css/Navbar.css"
import { Link, useMatch , useResolvedPath } from "react-router-dom";
import { logout } from "../firebase";


export function Navbar(){
    return( 
            <div className="nav">
            {/* <img src={logo} alt="logo" height="px"/> */}
            <ul>
                    <CustomLink to="/" >logo</CustomLink>
                    <CustomLink to="/"> DashBoard</CustomLink>
                    <CustomLink to="/WorkList">WorkLists</CustomLink>
                    <CustomLink to="/Employees">Employees</CustomLink>
                    <CustomLink to="/Inventory">Inventory</CustomLink>
                    NombreAdmin
                    <button onClick={logout}>Log out</button>
                    
            </ul>
            </div>
        ); 
}
function CustomLink ({to, children, ...props}){
    const resolvedPath = useResolvedPath(to)
    const isActive = useMatch({path: resolvedPath.pathname, end: true})
    return(
        <li>
            <Link className={isActive ? "active" : ""} to={to} {...props}>
                {children}
            </Link>
        </li>
    );
}