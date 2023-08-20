import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './FavoriteByID.css'; // Import your custom CSS file for styling
import Navbar from './Navbar';

export default function FavoriteByID() {
    document.title = 'More Detail';
    const [data, setData] = useState(null);
    const { id } = useParams();

    // Helper function to remove HTML tags
    function removeHtmlTags(text) {
        return text.replace(/<[^>]*>/g, '');
    }

    useEffect(() => {
        axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=3f452015613c4afcb2afec32fad21db0`)
            .then(res => setData(res.data))
            .catch(error => console.log(error)); // Handle any potential errors
    }, [id]);



    return (
        <>
            <Navbar />
            <div className='favoriteDetailCard'>
                {data && (
                    <>
                        <h1>{data.title}</h1>
                        <img src={data.image} alt={data.title} />
                        <div className='diets-container'>
                            Diets: {data.diets.map(e => (
                                <div className='diet-box' key={e}>
                                    {e}
                                </div>
                            ))}
                        </div>
                        <div className='instructions-container'>
                            <div className='instruction-box'>
                                <b>Instructions:</b>
                                <div >
                                    {removeHtmlTags(data.instructions)
                                        .split('.')
                                        .filter(step => step.trim() !== '') // Remove empty steps
                                        .map((step, index) => (
                                            <div key={index} className='instruction-step'>
                                                <span className='step-number'>{index + 1}.</span>
                                                <span className='step-text'>{step.trim()}.</span>
                                            </div>
                                        ))}
                                </div>
                            </div>
                        </div>
                    </>
                )}

            </div>
        </>
    );
}
