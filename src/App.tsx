import "./bootstrap.css";
import "./App.css";

import { BrowserRouter as Router, Routes, Route }
    from "react-router-dom";
import HomePage from "./components/HomePage";
import IdentityListPage from "./components/IdentityListPage";
import LogoPage from "./components/LogoPage";
import IdentityPage from "./components/IdentityPage";
import StoredIdentitiesPage from "./components/StoredIdentitiesPage";
import CreateProofPage from "./components/CreateProofPage";
function App() {

  return (
    <Router>
      <Routes>
        <Route path="/home" element={<HomePage />}/>
        <Route path="/identitylist" element={<IdentityListPage />}/>
        <Route path="/identity" element={<IdentityPage />}/>
        <Route path="/storedidentities" element={<StoredIdentitiesPage />}/>
        <Route path="/createproof" element={<CreateProofPage />}/>
        <Route path="/" element={<LogoPage/>}/>
        <Route path="*" element={<LogoPage/>}/>
      </Routes>
    </Router>
  );
}

export default App;