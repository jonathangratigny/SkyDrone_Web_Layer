import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import Navbar from './components/Navbar';
import './App.css';
import Home from './components/pages/Home';
import DronesPage from './components/pages/Drones';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Services from './components/pages/Services';
import SignUp from './components/pages/SignUp';
import SignIn from './components/pages/SignIn';
import UserDashboard from './components/UserDashboard';
import Cart from './components/pages/Cart';
import { ParallaxProvider } from 'react-scroll-parallax';
import ErrorSection from './components/Error404';
import UsersDetails from './components/UsersDetails';
import UpdateUsersDetails from './components/UpdateUsersDetails';

const App = () => {
  return (
    <>
      <ParallaxProvider>
      <Router>
        <Navbar />
        <Routes>
          <Route path='/' exact element={<Home />}></Route>
          <Route path='/products/*' exact element={<DronesPage />}></Route>
          <Route path='/services' exact element={<Services />}></Route>
          <Route path='/sign-up' exact element={<SignUp />}></Route>
          <Route path='/sign-in' exact element={<SignIn />}></Route>
          <Route path='/dashboard' exact element={<UserDashboard />}></Route>
          <Route path='/cart' exact element={<Cart />}></Route>
          <Route path='/mesinfos' exact element={<UsersDetails />}></Route>
          <Route path='/updateuserdetails' exact element={<UpdateUsersDetails />}></Route>
          <Route path='/*' exact element={<ErrorSection />}></Route>
        </Routes>

      </Router>
      </ParallaxProvider>
    </>
  );
}

export default App;