import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
    Collapse,
    Navbar,
    NavbarToggler,
    NavbarBrand,
    Nav,
    NavItem,
    NavLink
} from 'reactstrap'

function NavComp() {
    const [isOpen, setIsOpen] = useState(false)
    const [isLogin, setIsLogin] = useState(sessionStorage.getItem('logged'))
    const navigate = useNavigate()

    function handleLogout() {
        sessionStorage.removeItem('logged')
        sessionStorage.removeItem('id')
        setIsLogin(false)
        navigate('/')
    }
    function handleLogin() {
        navigate('/')
    }

    return (
        <header>
            <Navbar className="header-container" light expand="md">
                <NavbarBrand href="/catalog" className="logo-style">Shop.com</NavbarBrand>
                <NavbarToggler className="toggler" onClick={() => setIsOpen(!isOpen)} />
                <Collapse isOpen={isOpen} navbar>
                    <Nav className="nav-collapse-style nav-menu-container ml-auto" navbar>
                        {!isLogin ?
                            <NavItem>
                                <a href='#' className="nav-menu-item logging-btn" onClick={handleLogin}>Login</a>
                            </NavItem> :
                            <>
                                <NavItem>
                                    <NavLink className="nav-menu-item" href="/profile">Profile</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink className="nav-menu-item" href="/dashboard">Dashboard</NavLink>
                                </NavItem>
                            </>}
                        <NavItem>
                            <NavLink className="nav-menu-item" href="/catalog">Catalog</NavLink>
                        </NavItem>
                        {isLogin ?
                            <NavItem>
                                <a href='#' className="nav-menu-item logging-btn" onClick={handleLogout}>Logout</a>
                            </NavItem> : null}
                    </Nav>
                </Collapse>
            </Navbar>
        </header >

    )
}

export default NavComp;