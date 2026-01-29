import React, { useState, useEffect, useMemo } from 'react';
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import { ThemeProvider } from './contexts/ThemeContext';
import { getUserLogged, putAccessToken } from './utils/network-data';
import Navigation from './components/Navigation';
import HomePage from './pages/HomePage';
import DetailPage from './pages/DetailPage';
import AddPage from './pages/AddPage';
import ArchivedPage from './pages/ArchivedPage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';

function App() {
  const [authedUser, setAuthedUser] = useState(null);
  const [initializing, setInitializing] = useState(true);
  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'light');

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    localStorage.setItem('theme', newTheme);
    setTheme(newTheme);
  };

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const themeContextValue = useMemo(() => ({ theme, toggleTheme }), [theme]);

  useEffect(() => {
    async function fetchAuth() {
      const { data } = await getUserLogged();
      setAuthedUser(data);
      setInitializing(false);
    }
    fetchAuth();
  }, []);

  async function onLoginSuccess({ accessToken }) {
    putAccessToken(accessToken);
    const { data } = await getUserLogged();
    setAuthedUser(data);
  }

  function onLogout() {
    setAuthedUser(null);
    putAccessToken('');
  }

  if (initializing) {
    return null; 
  }

  return (
    <BrowserRouter>
      <ThemeProvider value={themeContextValue}>
        <div className="app-container">
          <header>
            <h1><Link to='/'>Aplikasi Catatan</Link></h1>
            
            {authedUser && (
              <Navigation logout={onLogout} name={authedUser.name} />
            )}
          </header>

          <main>
            {authedUser === null ? (
              <Routes>
                <Route path="/*" element={<LoginPage loginSuccess={onLoginSuccess} />} />
                <Route path="/register" element={<RegisterPage />} />
              </Routes>
            ) : (
              <Routes>
                <Route path='/' element={<HomePage />} />
                <Route path='/archives' element={<ArchivedPage />} />
                <Route path='/notes/new' element={<AddPage />} />
                <Route path='/notes/:id' element={<DetailPage />} />
              </Routes>
            )}
          </main>
        </div>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;