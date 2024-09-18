import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './editemployee.css';

const EditEmployee = () => {
  const [employee, setEmployee] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [designation, setDesignation] = useState('');
  const [gender, setGender] = useState('');
  const [course, setCourse] = useState([]);
  const [image, setImage] = useState(null); // State for image file
  const navigate = useNavigate();
  const { id } = useParams(); // Extract employee ID from URL params

  useEffect(() => {
    const fetchEmployee = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/employee/${id}`);
        const emp = response.data;
        setEmployee(emp);
        setName(emp.Name);
        setEmail(emp.Email);
        setMobileNo(emp.MobileNo);
        setDesignation(emp.Designation);
        setGender(emp.Gender);
        setCourse(emp.Course);
      } catch (error) {
        console.error('Error fetching employee', error);
      }
    };
    fetchEmployee();
  }, [id]);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]); // Store the selected file
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('Name', name);
    formData.append('Email', email);
    formData.append('MobileNo', mobileNo);
    formData.append('Designation', designation);
    formData.append('Gender', gender);
    formData.append('Course', JSON.stringify(course)); // Convert array to JSON string
    if (image) {
      formData.append('Image', image); // Append the image file
    }

    try {
      await axios.put(`http://localhost:5000/updateEmployee/${id}`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Ensure correct content type
        },
      });

      navigate('/employees'); // Redirect to employee list after update
    } catch (error) {
      console.error('Error updating employee:', error.response ? error.response.data : error.message); // Log the error
    }   
  };

  return (
    <div className="edit-employee">
      <h2>Edit Employee</h2>
      {employee && (
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label>
            Mobile No:
            <input
              type="text"
              value={mobileNo}
              onChange={(e) => setMobileNo(e.target.value)}
              required
            />
          </label>
          <label>
            Designation:
            <select
              value={designation}
              onChange={(e) => setDesignation(e.target.value)}
              required
            >
              <option value="">Select Designation</option>
              <option value="HR">HR</option>
              <option value="MANAGER">MANAGER</option>
              <option value="Sales">Sales</option>
            </select>
          </label>
          <label>
            Gender:
            <div>
              <label>
                <input
                  type="radio"
                  value="Male"
                  checked={gender === 'Male'}
                  onChange={() => setGender('Male')}
                />
                Male
              </label>
              <label>
                <input
                  type="radio"
                  value="Female"
                  checked={gender === 'Female'}
                  onChange={() => setGender('Female')}
                />
                Female
              </label>
            </div>
          </label>
          <label>
            Course:
            <div>
              <label>
                <input
                  type="checkbox"
                  value="BCA"
                  checked={course.includes('BCA')}
                  onChange={(e) => {
                    const value = e.target.value;
                    setCourse((prev) =>
                      prev.includes(value)
                        ? prev.filter((item) => item !== value)
                        : [...prev, value]
                    );
                  }}
                />
                BCA
              </label>
              <label>
                <input
                  type="checkbox"
                  value="MCA"
                  checked={course.includes('MCA')}
                  onChange={(e) => {
                    const value = e.target.value;
                    setCourse((prev) =>
                      prev.includes(value)
                        ? prev.filter((item) => item !== value)
                        : [...prev, value]
                    );
                  }}
                />
                MCA
              </label>
              <label>
                <input
                  type="checkbox"
                  value="BSC"
                  checked={course.includes('BSC')}
                  onChange={(e) => {
                    const value = e.target.value;
                    setCourse((prev) =>
                      prev.includes(value)
                        ? prev.filter((item) => item !== value)
                        : [...prev, value]
                    );
                  }}
                />
                BSC
              </label>
            </div>
          </label>
          <label>
            Image:
            <input
              type="file"
              accept="image/*"
              onChange={handleImageChange}
            />
          </label>
          <button type="submit">Save Changes</button>
        </form>
      )}
    </div>
  );
};

export default EditEmployee;
