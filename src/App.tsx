import "./bootstrap.css";
import "./App.css";

import { BrowserRouter as Router, Routes, Route }
    from "react-router-dom";
import HomePage from "./components/HomePage";
import SecondPage from "./components/SecondPage";
import LogoPage from "./components/LogoPage";
import IdentityPage from "./components/IdentityPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<HomePage />}/>
        <Route path="/second" element={<SecondPage />}/>
        <Route path="/identity" element={<IdentityPage />}/>
        <Route path="/" element={<LogoPage/>}/>
        <Route path="*" element={<LogoPage/>}/>
      </Routes>
    </Router>
  );
}

export default App;