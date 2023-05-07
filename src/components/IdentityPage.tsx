import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react'
import "../App.css";
import "../bootstrap.css";
import logo from '../images/logo.png';
import { Identity } from "@semaphore-protocol/identity"
import { useNavigate } from "react-router-dom"


function IdentityPage() {
  const navigate = useNavigate()
  const { state } = useLocation();
  const [proofRequest, setProofRequest] = useState('');
  useEffect(() => {
    const params = new URLSearchParams(window.location.search)
    let proof_request = params.get('proof_request')
    if (proof_request)
      setProofRequest(proof_request);
  }, [])
  const submitNo = () => {
    alert("No pressed")
  };
  const submitYes = () => {
    const { trapdoor, nullifier, commitment } = new Identity()
    var identities = JSON.parse(localStorage.getItem("identities") || "[]");
    if (identities.filter((e: { name: string }) => e.name === proofRequest).length > 0) {
      /* identities already contains the element we're trying to create */
      alert("Error: entry already exists");
    }
    else 
    {
      var identity = {name:proofRequest, commitment: commitment.toString(), trapdoor: trapdoor.toString(), nullifier: nullifier.toString()};
      identities.push(identity);
      localStorage.setItem("identities", JSON.stringify(identities));
    }
    navigate('/storedidentities');
  };
  return (
  <div>
    <span className="h1 fw-bold mb-0 center">
      <img src={logo} alt={"Login image"} style={{ width: '25px', height: '30px', marginBottom:'2px'}}/>
        Plurality
    </span>
    <div className='center'>
    <p>Do you want to create a new identity for <b>{proofRequest}</b>?</p>
    <button className="btn btn-info btn-lg btn-block" type="button" onClick={submitNo} style={{backgroundColor:'#DE3163', borderColor: '#DE3163', color:'#FFFFFF'}}>No</button>
    &nbsp;&nbsp;
    <button className="btn btn-info btn-lg btn-block" type="button" onClick={submitYes} style={{backgroundColor:'#DE3163', borderColor: '#DE3163', color:'#FFFFFF'}}>Yes</button>
    </div>
  </div>
  );
  }
  
  export default IdentityPage;