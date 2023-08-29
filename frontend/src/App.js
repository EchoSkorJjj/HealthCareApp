import logo from './logo.svg';
import './App.css';


// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";

// We import all the components we need in our app
import Register from './components/Register';

function App() {
  return (
    <div>
      <Register />
    </div>
  );
}

export default App;
