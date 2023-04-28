import "./bootstrap.css";
import "./App.css";

import { BrowserRouter as Router, Routes, Route }
    from "react-router-dom";
import HomePage from "./components/HomePage";
import IdentityListPage from "./components/IdentityListPage";
import LogoPage from "./components/LogoPage";
import IdentityPage from "./components/IdentityPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<HomePage />}/>
        <Route path="/identitylist" element={<IdentityListPage />}/>
        <Route path="/identity" element={<IdentityPage />}/>
        <Route path="/" element={<LogoPage/>}/>
        <Route path="*" element={<LogoPage/>}/>
      </Routes>
    </Router>
  );
}

export default App;