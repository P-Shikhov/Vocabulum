import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';

import Header from './components/Header';
import { AuthProvider } from './AuthContext';
import LoginPage from './pages/LoginPage';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <AuthProvider>
            <Header />
          <Routes>  
            {/* <Route component={LoginPage} path="/login" /> */}
            <Route element={<LoginPage />}  path="/login" />
          </Routes>
        </AuthProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
