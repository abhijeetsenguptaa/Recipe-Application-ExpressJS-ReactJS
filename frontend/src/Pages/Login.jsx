import React from 'react';
import './Login.css'; // Import your custom CSS file for styling
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Login() {
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
        axios.post('http://localhost:3001/users/login', formData)
            .then((res) => {
                localStorage.setItem('token', res.data.token);
                toast.success('Login successful!', {
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
            <h2>Login</h2>
            <form className="login-form">
                <div className="form-group">
                    <label>Email:</label>
                    <input type="email" name="email" value={formData.email} onChange={handleChange} />
                </div>
                <div className="form-group">
                    <label>Password:</label>
                    <input type="password" name="password" value={formData.password} onChange={handleChange} />
                </div>
                <button className="login-button" type="button" onClick={handleClick}>Log In</button>
            </form>
            <p>
                <a className="forgot-password-link" href="/forgot-password">Forgot Password?</a>
            </p>
            <p>
                Don't have an account? <a className="signup-link" href="/register">Sign Up</a>
            </p>
            <ToastContainer />
        </div>
    );
}
