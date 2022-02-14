import '../App.css';
import { Link } from "react-router-dom";

function Nav() {
    return (<header className="header-container navbar navbar-expand-md">
        <nav className="container">
            <Link to="/catalog" className="logo-style navbar-brand">Shop.com</Link>
            <button className="nav-btn navbar-toggler" type="button" data-bs-toggle="collapse"
                data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false"
                aria-label="Toggle navigation">
                <svg height="20" width="20">
                    <circle cx="11" cy="11" r="10" fill="#483434
            " />
                </svg>
            </button>
            <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                <ul className="nav-collapse-style nav-menu-container navbar-nav">
                    <li className="navbar-item nav-menu-item">
                        <Link className="navbar-item nav-menu-item" to="/dashboard">Dashboard</Link>
                    </li>
                    <li className="navbar-item nav-menu-item">
                        <Link to="/catalog">Catalog</Link>
                    </li>
                </ul>
            </div>
        </nav>
    </header >
    )
}

export default Nav;