import "./bootstrap.css";
import "./App.css";

import logo from './images/logo.png';

import { BrowserRouter as Router, Routes, Route }
    from "react-router-dom";
import HomePage from "./components/HomePage";
import SecondPage from "./components/SecondPage";
import LogoPage from "./components/LogoPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<HomePage />}/>
        <Route path="/second" element={<SecondPage />}/>
        <Route path="/" element={<LogoPage/>}/>
        <Route path="*" element={<LogoPage/>}/>

      </Routes>
    </Router>

    /*<div className="App">
      <img src={logo} alt={"None"} style={{width: '50px', height: '50px' }} />
      <h1 className="display-6 text-center">Plurality</h1>
    </div>*/
  );
}

export default App;