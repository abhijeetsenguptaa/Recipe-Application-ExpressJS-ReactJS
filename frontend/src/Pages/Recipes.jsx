import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '../Components/Card';

export default function Recipes() {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const handleFavorite = (e) => {
        let obj = {
            recipeID: e,
        }
        axios.post(`http://localhost:3001/favorites/${e}`, obj, {
            headers: {
                "Content-Type": "application/json",
                Authorization: localStorage.getItem('token')
            }
        })
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }

    const handleDetails = (e) => {
        window.location.href = `/${e}`
    }

    useEffect(() => {
        axios
            .get('https://api.spoonacular.com/recipes/complexSearch?apiKey=bb1692a2431e40c09ae952ef475f2a70')
            .then((res) => {
                setData(res.data.results);
                setLoading(false);
            })
            .catch((error) => {
                setError(error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error.message}</div>;
    }

    return (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr', gap: '10px', padding: '10px' }}>
            {data.map((recipe) => (
                <Card key={recipe.id} title={recipe.title} image={recipe.image} onFavoriteClick={(e) => handleFavorite(recipe.id)} onDetailsClick={(e) => handleDetails(recipe.id)} />
            ))}
        </div>
    );
}
