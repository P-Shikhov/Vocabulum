import React, {useContext, useEffect } from 'react';
import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import AuthContext from './context/AuthContext';
import './App.css';

import Header from './components/Header';
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import PrivateRoute from './utils/PrivateRoute';

function App() {
  let {user} = useContext(AuthContext);

  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider>
          <Header />
          <Routes>
            {/* <PrivateRoute component={HomePage} path="/" exact></PrivateRoute> */}
            <Route component={HomePage} path="/" exact>
                {user ? "children" : <Navigate to="/login" />}
            </Route>
            <Route component={LoginPage} path="/login"></Route>
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
