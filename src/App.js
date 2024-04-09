import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from "./Views/HomePage/HomePage";
import Forecasts from './Views/Forecasts/Forecasts';
import TabWrapper from "./Components/Tabs/TabWrapper";
import Header from './Components/Headers/AppHeader';
import Login from './Components/Auth/Login';
import ProtectedRoute from './Components/Auth/ProtectedRoute';
import './App.css';


function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('access_token'));

    const handleLogin = () => {
        setIsLoggedIn(true);
    };

    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login onLogin={handleLogin} />} />
                <Route path="/" element={
                    <ProtectedRoute>
                        <Header />
                        <HomePage />
                    </ProtectedRoute>
                } />
                <Route path="/forecasts/:etfName" element={
                    <ProtectedRoute>
                        <Header />
                        <Forecasts />
                    </ProtectedRoute>
                } />
                <Route path="/model_metadata/:etfName/:model_id" element={
                    <ProtectedRoute>
                        <Header />
                        <TabWrapper />
                    </ProtectedRoute>
                } />
            </Routes>
        </Router>
    );
}

export default App;
