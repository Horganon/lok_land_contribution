import React from 'react';
import { Switch, Routes, Route } from 'react-router-dom';
import Menu from './components/menu';
import LandData from './components/landData'



function App() {
  	return (
        <Routes>
            <Route path="/" element={<Menu/>} />
            <Route path="/landData/:id/:date_start/:date_end" element={<LandData/>} />
        </Routes>
    );
}

export default App;
