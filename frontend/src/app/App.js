import './App.css';


// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";

// We import all the components we need in our app
import Register from './user-pages/Register';
import Login from './user-pages/Login';
import NavBar from './shared/NavBar';
import ForgotPass from './user-pages/ForgotPass';

function App() {
  return (
    <div>
      <NavBar />
      <Routes>
        <Route path="/user-pages/register" element={<Register/>}/>
        <Route path="/user-pages/login" element={<Login/>}/>
      </Routes>
      
    </div>
  );
}

export default App;
