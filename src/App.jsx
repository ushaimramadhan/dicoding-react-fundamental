import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';
import DetailPage from './pages/DetailPage';
import AddPage from './pages/AddPage';

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <header>
          <h1><Link to='/'>Aplikasi Catatan</Link></h1>
          <nav className='navigation'>
            <ul>
              <li><Link to='/archives'>Arsip</Link></li>
            </ul>
          </nav>
        </header>
        <main>
          <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path='/notes/new' element={<AddPage />} />
            <Route path='/notes/:id' element={<DetailPage />} />
          </Routes>
        </main>
      </div>    
    </BrowserRouter>
  );
}

export default App;
