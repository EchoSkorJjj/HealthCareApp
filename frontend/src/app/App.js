import './App.css';
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from '../features/auth'

import { AppRouter } from './AppRouter'

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
