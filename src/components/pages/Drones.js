import React from 'react'
import { Routes, Route } from 'react-router-dom'
import '../../App.css'
import Drones from '../Drones'
import Drone from '../Drone'
import { CartProvider, useCart } from "react-use-cart";

const DronesPage = () => {
  const { addItem } = useCart();
  return (
    <Routes>
        <Route path='/' element={<Drones />}></Route>
        <Route path=':id' element={<Drone />}></Route>
    </Routes>
  );
}

export default DronesPage