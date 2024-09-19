import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './navbar.css';

const Navbar = () => {
    const [userName, setUserName] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const storedUserName = localStorage.getItem('f_userName');
        if (storedUserName) {
            setUserName(storedUserName);
        }
    }, []);

    const handleLogout = () => {
        localStorage.clear();
        navigate('/login');
    };

    return (
        <nav className="navbar">
            <div className="navbar-brand">MyApp</div>
            <ul className="navbar-links">
                <li><Link to="/dashboard">Home</Link></li>
                <li><Link to="/employees">Employee List</Link></li>
            </ul>
            <div className="navbar-user">
                <span>{userName}</span>
                <button onClick={handleLogout} className="logout-button">Logout</button>
            </div>
        </nav>
    );
};

export default Navbar;
