import React from 'react';
import logo from '../../logo.png';
import { Link } from 'react-router-dom';
import { FaSearch } from "react-icons/fa";


const Header = () => {
    console.log(logo)
    return (
        <nav className="header">

            <img src={logo} alt="logo" />


            <div>
                <Link to="/tvshows" >TV Shows</Link>
                <Link to="/movies" >Movies</Link>
                <Link to="/recent" >Recently Added</Link>
                <Link to="/mylist" >My list</Link>
            </div>

            <FaSearch />

        </nav>

    );
};

export default Header;