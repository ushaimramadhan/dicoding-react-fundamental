import React from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import HomePage from './pages/HomePage';

const DetailPage = () => <p>Halaman Detail-tes</p>
const AddPage = () => <p>Halaman Tambah-tes</p>

function App() {
  return (
    <BrowserRouter>
      <div className="app-container">
        <header>
          <h1><Link to='/'>Aplikasi Catatan</Link></h1>
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
