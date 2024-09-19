import React, { useEffect, useState } from 'react';
import './dashboard.css';
import Navbar from './navbar';

const Dashboard = () => {
  const [userName, setUserName] = useState('');
  useEffect(() => {
    const storedUserName = localStorage.getItem('f_userName');
    if (storedUserName) {
        setUserName(storedUserName);
    }
}, []);

  return (
<>
<Navbar/>
<div className="dashboard-content">
  <div className="dashboard-box">
    <h2>Welcome to the Dashboard, {userName}</h2>
    <p>Here you can manage your employees and perform other tasks.</p>
  </div>
</div>
</>
  );
};

export default Dashboard;
