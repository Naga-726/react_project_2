import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SingUpPage from './pages/SingUpPage';
import SignInPage from './pages/SignInpage';
import Dashboard from './pages/Dashboard';
import AdminPage from './pages/AdminPage';
import UnauthorisedPage from './pages/UnauthorisedPage';
import Navbar from './components/Navbar';

function App() {
  return (
    
    <Router>
      <Navbar/>
      <Routes>
      
        <Route path="/" element={<SingUpPage/>} />
        <Route path="/signin" element={<SignInPage/>} />
        <Route path='/unauthorised' element={<UnauthorisedPage/>}/>
        
        
        <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path='/admin' element={<AdminPage/>}/>
          
      </Routes>
    </Router>
  );
}

export default App;
