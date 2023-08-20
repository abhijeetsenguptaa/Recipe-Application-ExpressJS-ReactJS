import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Card from '../Components/Card';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Navbar from '../Components/Navbar';
import './Recipes.css'

export default function Recipes() {
    document.title = 'Recipes'
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [searchQuery, setSearchQuery] = useState('');
    const handleFavorite = async (e) => {
        try {
            const response = await axios.get(`http://localhost:3001/favorites/?recipeID=${e}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: localStorage.getItem('token')
                }
            });

            if (response.status === 200) {
                toast.error('Item is already in the Favorites.');
            }

        } catch (error) {
            if (error.response.status === 404) {
                try {
                    await axios.post(`http://localhost:3001/favorites/${e}`, {
                        recipeID: e
                    }, {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: localStorage.getItem('token')
                        }
                    });
                    toast.success('Recipe added to Favorites.');
                } catch (error) {
                    toast.error('Failed to add recipe to Favorites.');
                }
            }
        }
    }

    const handleDetails = (e) => {
        window.location.href = `/${e}`;
    }

    const handleSearch = () => {
        // Filter data based on the searchQuery
        const filteredData = data.filter(recipe => recipe.title.toLowerCase().includes(searchQuery.toLowerCase()));
        setData(filteredData);
    }

    useEffect(() => {
        axios
            .get('https://api.spoonacular.com/recipes/complexSearch?apiKey=3f452015613c4afcb2afec32fad21db0')
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
        <div>
            <Navbar />
            <div style={{ width: '80%', display: 'flex', gap: '10px', margin: '0 auto' }}>
                <input type="search" style={{ width: '70%' }} onChange={(e) => setSearchQuery(e.target.value)} />
                <button onClick={handleSearch}>Search</button>
            </div>
            <div className='recipe-items'>
                {data.map((recipe) => (
                    <Card key={recipe.id} title={recipe.title} image={recipe.image} onFavoriteClick={() => handleFavorite(recipe.id)} onDetailsClick={() => handleDetails(recipe.id)} />
                ))}
            </div>
            <ToastContainer position="bottom-right" />
        </div>
    );
}
