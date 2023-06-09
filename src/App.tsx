import "./styles/bootstrap.css";
import "./styles/App.css";

import { BrowserRouter as Router, Routes, Route }
    from "react-router-dom";
import Home from "./pages/Home";
import AddNewIdentity from "./pages/backup-pages/AddNewIdentity";
import Splash from "./pages/Splash";
import RequestIdentityCreation from "./pages/RequestIdentityCreation";
import RequestProofCreation from "./pages/RequestProofCreation";
import StoredIdentities from "./pages/StoredIdentities";
import CreateProof from "./pages/backup-pages/CreateProof";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/home" element={<Home />}/>
        <Route path="/addidentity" element={<AddNewIdentity />}/>
        <Route path="/requestidentitycreation" element={<RequestIdentityCreation />}/>
        <Route path="/requestproofcreation" element={<RequestProofCreation />}/>
        <Route path="/storedidentities" element={<StoredIdentities />}/>
        <Route path="/createproof" element={<CreateProof />}/>
        <Route path="/" element={<Splash/>}/>
        <Route path="*" element={<Splash/>}/>
      </Routes>
    </Router>
  );
}

export default App;