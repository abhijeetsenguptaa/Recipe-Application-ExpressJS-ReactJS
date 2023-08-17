import React from 'react'
import {Routes,Route} from 'react-router-dom';
import Landing from '../Pages/Landing';
import Register from '../Pages/Register';


export default function AllRoutes() {
  return (
    <Routes>
        <Route path='/' element={<Landing/>}></Route>
        <Route path='/register' element={<Register/>}></Route>
    </Routes>
  )
}
