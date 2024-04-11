import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import HomePage from "./Views/HomePage/HomePage";
import Header from './Components/Headers/Header';
import Login from './Components/Auth/Login';
import ProtectedRoute from './Components/Auth/ProtectedRoute';
import SidePanel from './Components/SidePanel/SidePanel';
import CompanyFacts from "./Views/CompanyFacts/CompanyFacts";


function App() {
    const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('access_token'));

    const handleLogin = () => {
        setIsLoggedIn(true);
    };

    return (
        <Router>
            <Routes>
                <Route path="/login" element={<Login onLogin={handleLogin} />} />
                <Route
                    path="/"
                    element={
                        <ProtectedRoute>
                            <div className="app-container">
                                <Header />
                                <div className="main-content">
                                    <SidePanel />
                                    <HomePage />
                                </div>
                            </div>
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/company-facts"
                    element={
                        <ProtectedRoute>
                            <div className="app-container">
                                <Header />
                                <div className="main-content">
                                    <SidePanel />
                                    <CompanyFacts />
                                </div>
                            </div>
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </Router>
    );
}

export default App;