import React from 'react';
import './Login.css'; // Import your custom CSS file for styling
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Reset() {
    const [formData, setFormData] = React.useState({
        'email': '',
        'password': ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevData => ({
            ...prevData,
            [name]: value
        }));
    }

    const handleClick = () => {
        axios.post('http://localhost:3001/users/reset-password', formData)
            .then((res) => {
                toast.success('Password Changed successful!', {
                    position: toast.POSITION.TOP_RIGHT
                });
            })
            .catch((err) => {
                if (err.response) {
                    if (err.response.status === 401) {
                        toast.error('Invalid email or password', {
                            position: toast.POSITION.TOP_RIGHT
                        });
                    } else if (err.response.status === 404) {
                        toast.error('User not found', {
                            position: toast.POSITION.TOP_RIGHT
                        });
                    } else {
                        toast.error('An error occurred while logging in', {
                            position: toast.POSITION.TOP_RIGHT
                        });
                    }
                }
            });
    }

    return (
        <div className="login-container">
            <h2>Change Password</h2>
            <form className="login-form">
                <div className="form-group">
                    <label>Email:</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input type="password" name="password" value={formData.password} onChange={handleChange} />
                </div>
                <button className="login-button" type="button" onClick={handleClick}>Change Password</button>
            </form>
            <ToastContainer />
        </div>
    );
}
