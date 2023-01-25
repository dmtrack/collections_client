import React from 'react';
import { Routes, Route } from 'react-router-dom';
import { Navigation } from './App/components/Navigation';
import LogOut from './App/components/LogOut';
import { MainPage } from './App/layouts/Mainpage';
import Login from './App/layouts/Login';

const App: React.FC = () => {
    return (
        <>
            <Navigation />
            <Routes>
                <Route path="/login/:type?" element={<Login />} />
                <Route path="/" element={<MainPage />} />
                <Route path="/logout" element={<LogOut />} />
            </Routes>
        </>
    );
};

export default App;
