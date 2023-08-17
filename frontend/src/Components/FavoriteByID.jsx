import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import './FavoriteByID.css'; // Import your custom CSS file for styling

export default function FavoriteByID() {
    const [data, setData] = useState(null);
    const { id } = useParams();

    // Helper function to remove HTML tags
    function removeHtmlTags(text) {
        return text.replace(/<[^>]*>/g, '');
    }

    useEffect(() => {
        axios.get(`https://api.spoonacular.com/recipes/${id}/information?apiKey=bb1692a2431e40c09ae952ef475f2a70`)
            .then(res => setData(res.data))
            .catch(error => console.log(error)); // Handle any potential errors
    }, [id]);

    return (
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
                    <p><b>Instructions:</b> {removeHtmlTags(data.instructions)}</p>
                </>
            )}
        </div>
    );
}
