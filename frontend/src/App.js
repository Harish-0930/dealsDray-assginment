import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import CreateEmployee from './components/createemployee';
import Dashboard from './components/dashboard';
import EditEmployee from './components/editemployee';
import EmployeeTable from './components/employee';
import Login from './components/login';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/employees" element={<EmployeeTable />} />
          <Route path="/edit-employee/:id" element={<EditEmployee />} />
          <Route path="/create-employee" element={<CreateEmployee />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
