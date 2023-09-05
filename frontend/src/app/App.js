import './App.css';


// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";

// We import all the components we need in our app
import { AuthProvider } from '../contexts/AuthContext';
import Register from './user-pages/Register';
import Login from './user-pages/Login';
import NavBar from './shared/NavBar';
import ForgotPass from './user-pages/ForgotPass';
import NutritionAnalyzer from './user-pages/NutritionAnalyzer';

function App() {
  return (
    <AuthProvider>
      <NavBar />
      <Routes>
        <Route path="/user-pages/register" element={<Register/>}/>
        <Route path="/user-pages/login" element={<Login/>}/>
        <Route path="/user-pages/nutritionanalyzer" element={<NutritionAnalyzer/>}/>
      </Routes>
    </AuthProvider>

  );
}

export default App;
