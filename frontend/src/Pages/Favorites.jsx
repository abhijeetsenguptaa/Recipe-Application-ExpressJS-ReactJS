import axios from 'axios';
import React, { useEffect, useState } from 'react';
import FavoriteCard from '../Components/FavoriteCard';

export default function Favorites() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(false);
    const [data, setData] = useState([]);

    function fetchFavorites(){
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
    }

    const removeHandler = (id) => {
        axios.delete(`http://localhost:3001/favorites/${id}`, {
            headers: {
                "Content-Type": 'application/json',
                "Authorization": localStorage.getItem('token')
            }
        })
            .then(() => {
                fetchFavorites();
            })
            .catch(err => console.log(err))
    }

    useEffect(() => {
        fetchFavorites();
    }, []);

    return (
        <div style={{textAlign:'center'}}>
            <h2>Your Favorites</h2>
            {loading && <p>Loading...</p>}
            {error && <p>Error fetching favorites.</p>}
            {!loading && !error && (
                <ul style={{display:'grid',gridTemplateColumns:'repeat(3,1fr'}}>
                    {data.map(favorite => (
                        <FavoriteCard id={favorite.recipeID} key={favorite.id} handleRemove={() => removeHandler(favorite.id)} />
                    ))}
                </ul>
            )}
        </div>
    );
}
