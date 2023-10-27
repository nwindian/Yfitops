import logo from './logo.svg';
import './App.css';
import DangerButton from './components/login';
import axios from 'axios';
import Login from './components/login';
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link
} from "react-router-dom";
import Home from './components/home';
import Second from './components/home2';

const loginContainer = {
  display: "flex",
  borderWidth: "50%",
  boxShadow: "0 0 3px 2px #cec7c759",
  alignItems: "center",
  padding: 20,
  borderRadius: 20,
  justifyContent: "center",
  borderLeft: 500,
  marginLeft: "25%",
  marginRight: "25%",
  marginTop: "50%",
};

function App() {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/home">Home</Link>
            </li>
            <li>
              <Link to="/">Login</Link>
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Routes>
          <Route path="/home" element={<Home />}>
          </Route>
          <Route path="/" element={<Login />}>
          </Route>
          <Route path="/second" element={<Second />}>
          </Route>
        </Routes>
      </div>
    </Router>
  );
}

export default App;
