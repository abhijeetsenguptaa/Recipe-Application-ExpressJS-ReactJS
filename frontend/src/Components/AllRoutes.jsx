import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Landing from '../Pages/Landing';
import Register from '../Pages/Register';
import Recipes from '../Pages/Recipes';
import Favorites from '../Pages/Favorites';
import Login from '../Pages/Login';
import FavoriteByID from './FavoriteByID';


export default function AllRoutes() {
  return (
    <Routes>
      <Route path='/' element={<Landing />}></Route>
      <Route path='/register' element={<Register />}></Route>
      <Route path='/login' element={<Login />}></Route>
      <Route path='/recipes' element={<Recipes />}></Route>
      <Route path='/favorites' element={<Favorites />}></Route>
      <Route path='/:id' element={<FavoriteByID/>}></Route>
    </Routes>
  )
}
