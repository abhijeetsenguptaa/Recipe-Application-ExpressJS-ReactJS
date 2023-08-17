import axios from 'axios';
import React, { useEffect, useState } from 'react';
import FavoriteCard from '../Components/FavoriteCard';

export default function Favorites() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [data, setData] = useState([]);
    
    const removeHandler = (e) => {
        console.log(e);
    }

    useEffect(() => {
        axios.get(`http://localhost:3001/favorites/`, { 
            headers: {
                "Content-Type": 'application/json',
                "Authorization": localStorage.getItem('token')
            }
        })
        .then(res => {
            setLoading(false);
            setData(res.data.data);
        })
        .catch(err => {
            setLoading(false);
            setError(true);
            console.log(err);
        });
    }, []); 

    return (
        <div>
            <h2>Your Favorites</h2>
            {loading && <p>Loading...</p>}
            {error && <p>Error fetching favorites.</p>}
            {!loading && !error && (
                <ul>
                    {data.map(favorite => (
                        <FavoriteCard id={favorite.recipeID} key={favorite.recipeID} handleRemove={()=> removeHandler(favorite.id)}/>
                    ))}
                </ul>
            )}
        </div>
    )
}