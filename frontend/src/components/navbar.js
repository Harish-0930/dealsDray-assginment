import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './navbar.css'; // For CSS styling

const Navbar = () => {
    const [userName, setUserName] = useState('');
    const navigate = useNavigate();

    // Retrieve the stored username once when the component mounts
    useEffect(() => {
        const storedUserName = localStorage.getItem('f_userName');
        if (storedUserName) {
            setUserName(storedUserName);
        }
    }, []); // Empty dependency array ensures this runs only once on mount

    const handleLogout = () => {
        // Clear local storage and redirect to login page
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
                {/* Display the retrieved username */}
                <span>{userName}</span>
                <button onClick={handleLogout} className="logout-button">Logout</button>
            </div>
        </nav>
    );
};

export default Navbar;
