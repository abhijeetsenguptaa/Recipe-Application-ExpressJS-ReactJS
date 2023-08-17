import React from 'react';
import InputBox from '../Components/InputBox';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS for styling

export default function Register() {
    document.title = "Register"
    const url = 'http://localhost:3001/'
    const [formData, setFormData] = React.useState({
        firstName: '',
        lastName: '',
        email: '',
        password: '',
        age: 0,
        gender: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const handleClick = () => {
        axios.post(`${url}users/register`, formData)
            .then(res => {
                console.log(res.data);
                toast.success('Registration successful');
            })
            .catch(error => {
                // console.error(error);
                if (error.response) {
                    const statusCode = error.response.status;
                    if (statusCode.toString() === 400) {
                        toast.error('Invalid input. Please provide valid data.');
                    } else if (statusCode.toString() === 409) {
                        toast.error('User with this email already exists.');
                    } else {
                        toast.error('An error occurred. Please try again later.');
                    }
                } else {
                    toast.error('An error occurred. Please try again later.');
                }
            });
    };

    return (
        <div>
            <div>
                {/* Apply the left navBar */}
            </div>
            <div style={{ textAlign: 'center',padding:'10px' }}>
                <h1>CookBook</h1>
                <p>Once registered, CookBook is free to try with up to 40 recipes & 5 OCR scans. You will need to select a subscription once you've reached these limits.</p>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', width: '100%', textAlign: 'center' }}>
                    <p>Pricing</p>
                    <p>|</p>
                    <p>Why Register</p>
                    <p>|</p>
                    <p>FAQs</p>
                </div>
                <h2>Create account</h2>
                <InputBox type="text" placeholder="First Name.." name="firstName" onChange={handleChange} value={formData.firstName} />
                <InputBox type="text" placeholder="Last Name.." name="lastName" onChange={handleChange} value={formData.lastName} />
                <InputBox type="email" placeholder="Valid email address.." name="email" onChange={handleChange} value={formData.email} />
                <InputBox type="password" placeholder="Password (min 8 characters).." name="password" onChange={handleChange} value={formData.password} />
                <InputBox type="number" placeholder="Age.." name="age" onChange={handleChange} value={formData.age} />
                <select name="gender" onChange={handleChange} value={formData.gender} style={{ padding: '12px', width: '40%', textAlign: 'center', borderRadius: '6px' }}>
                    <option value="">Choose your gender</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Others</option>
                </select>
                <h2>By continuing you agree to our Terms and Privacy Policy.</h2>
                <InputBox type="checkbox" />
                <button style={{ padding: '10px', width: '40%', textAlign: 'center', borderRadius: '6px', backgroundColor: 'black', color: 'white' }} onClick={handleClick}>Create Account</button>
                <ToastContainer /> {/* The toast container */}
            </div>
        </div>
    );
}
