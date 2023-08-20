import React from 'react'
import { Routes, Route } from 'react-router-dom';
import Register from '../Pages/Register';
import Recipes from '../Pages/Recipes';
import Favorites from '../Pages/Favorites';
import Login from '../Pages/Login';
import FavoriteByID from './FavoriteByID';
import Reset from '../Pages/Reset';


export default function AllRoutes() {
  return (
    <Routes>
      <Route path='/' element={<Recipes />}></Route>
      <Route path='/register' element={<Register />}></Route>
      <Route path='/login' element={<Login />}></Route>
      <Route path='/forgot-password' element={<Reset/>}></Route>
      <Route path='/recipes' element={<Recipes />}></Route>
      <Route path='/favorites' element={<Favorites />}></Route>
      <Route path='/:id' element={<FavoriteByID/>}></Route>
    </Routes>
  )
}
