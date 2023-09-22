import './App.css';
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from '../features/auth'
import { AppRouter } from './AppRouter'
import { useEffect } from 'react';

function App() {
  
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRouter />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
