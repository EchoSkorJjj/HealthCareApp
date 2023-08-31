import logo from './logo.svg';
import './App.css';


// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";

// We import all the components we need in our app
import Register from './components/Register';
import Login from './components/Login';
import Navbar from './components/Navbar';


function App() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/register" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
      </Routes>
    </div>
  );
}

export default App;
