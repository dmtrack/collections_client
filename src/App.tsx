import React from 'react';
import { Routes, Route, BrowserRouter as Router } from 'react-router-dom';
import { Navigation } from './App/components/Navigation';
import LogOut from './App/components/LogOut';
import { AdminPanel } from './App/layouts/AdminPanel';
import Login from './App/layouts/Login';

const App: React.FC = () => {
    return (
        <>
            <Router>
                <Navigation />
                <Routes>
                    <Route path="/login/:type?" element={<Login />} />
                    <Route path="/" element={<AdminPanel />} />
                    <Route path="/logout" element={<LogOut />} />
                </Routes>
            </Router>
        </>
    );
};

export default App;
