import { useEffect, useState } from 'react'
import "../styles/App.css";
import "../styles/bootstrap.css";
import logo from '../images/logo.png';
import { Identity } from "@semaphore-protocol/identity";
import { useNavigate } from "react-router-dom";
import "../utils/BigIntUtils";

function RequestIdentityCreation() {
  const navigate = useNavigate()
  const [proofRequest, setProofRequest] = useState('');

  useEffect(() => {
    // get the proof request params for this popup
    const params = new URLSearchParams(window.location.search)
    let proof_request = params.get('proof_request')
    // if dapp requested for an identity, we expect a proof request name
    if (proof_request)
      setProofRequest(proof_request);
    // otherwise throw an error
    else
      alert("Error: Expecting a proof name from dApp but didn't get any");
  }, [])
  
  const submitNo = () => {
    alert("Will not respond to this request. Closing");
    window.close();
  };
  const submitYes = () => {
    const newIdentity = new Identity();

    var identities = JSON.parse(localStorage.getItem("identities") || "[]");
    if (identities.filter((e: { name: string }) => e.name === proofRequest).length > 0) {
      /* identities already contains the element we're trying to create */
      alert("Error: entry already exists");
    }
    else 
    {
      var identity = {name:proofRequest, storedIdentity: newIdentity.toString()};
      identities.push(identity);
      localStorage.setItem("identities", JSON.stringify(identities));
    }
    // navigating to the list of stored identities in both success and failure case
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
  
  export default RequestIdentityCreation;