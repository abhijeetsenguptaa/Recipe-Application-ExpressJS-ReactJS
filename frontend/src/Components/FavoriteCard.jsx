import axios from 'axios';
import React, { useState, useEffect } from 'react';
import './FavoriteCard.css'; // Import your custom CSS file for styling
import { Link } from 'react-router-dom';

export default function FavoriteCard(props) {
    const [data, setData] = useState(null);
    // Helper function to remove HTML tags
    function removeHtmlTags(text) {
        return text.replace(/<[^>]*>/g, '');
    }

    useEffect(() => {
        axios.get(`https://api.spoonacular.com/recipes/${props.id}/information?apiKey=bb1692a2431e40c09ae952ef475f2a70`)
            .then(res => setData(res.data))
            .catch(err => console.log(err))
    }, [props.id]);

    return (
        <div className="favorite-card" key={props.id}>
            {data && (
                <>
                    <Link to={`/${props.id}`} style={{textDecoration:'none'}}>
                        <img className="recipe-image" src={data.image} alt={data.title} />
                        <h3 className="recipe-title">{data.title}</h3>
                        <h4 className="time-to-make">Time to Make: {data.readyInMinutes} minutes</h4>
                        <p className="description">Description: {removeHtmlTags(data.summary)}</p>
                    </Link>
                    <div>
                        <button className="remove-button" onClick={props.handleRemove}>Remove</button>
                    </div>
                </>
            )}
        </div>
    );
}
