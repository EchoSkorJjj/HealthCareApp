import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from '../features/auth'
import { AppRouter } from './AppRouter'
import './App.css'
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {

  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRouter/>
      </AuthProvider>
    </BrowserRouter>
  )
}

export default App
