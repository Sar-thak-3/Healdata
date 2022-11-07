import React from 'react'
import { Link } from 'react-router-dom';

const Navbar = (props) => {
    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
            <div className="container-fluid">
                <button
                    className="navbar-toggler" type="button" data-mdb-toggle="collapse" data-mdb-target="#navbarCenteredExample" aria-controls="navbarCenteredExample" aria-expanded="false" aria-label="Toggle navigation">
                    <i className="fas fa-bars"></i>
                </button>
                <div
                    className="collapse navbar-collapse justify-content-center" id="navbarCenteredExample">
                    <ul className="navbar-nav mb-2 mb-lg-0">
                        <li className="nav-item mx-4">
                            <Link className="nav-link active" aria-current="page" to="/">Home</Link>
                        </li>
                        <li className="nav-item mx-4">
                            <Link className="nav-link" to="/services">Services</Link>
                        </li>
                        <li className="nav-item mx-4">
                            <Link className="nav-link" to="/updatedata">More</Link>
                        </li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}

export default Navbar