import { Link } from "react-router-dom";
import './Navbar.css';

export default function Navbar() {
    return (
        <div className="navbar">
            <Link to="/">Home</Link>
            <Link to="/keys">Keys</Link>
            <Link to="/signatures">Signatures</Link>
        </div>
    );
}