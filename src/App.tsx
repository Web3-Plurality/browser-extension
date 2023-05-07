import "./bootstrap.css";
import "./App.css";

import { BrowserRouter as Router, Routes, Route }
    from "react-router-dom";
import Home from "./pages/Home";
import IdentityList from "./pages/IdentityList";
import Splash from "./pages/Splash";
import Identity from "./pages/Identity";
import StoredIdentities from "./pages/StoredIdentities";
import CreateProof from "./pages/CreateProof";
function App() {

  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Home />}/>
        <Route path="/identitylist" element={<IdentityList />}/>
        <Route path="/identity" element={<Identity />}/>
        <Route path="/storedidentities" element={<StoredIdentities />}/>
        <Route path="/createproof" element={<CreateProof />}/>
        <Route path="/" element={<Splash/>}/>
        <Route path="*" element={<Splash/>}/>
      </Routes>
    </Router>
  );
}

export default App;