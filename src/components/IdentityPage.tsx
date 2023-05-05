import { Link, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react'
import "../App.css";
import "../bootstrap.css";
import logo from '../images/logo.png';
import { Identity } from "@semaphore-protocol/identity"


function IdentityPage() {
  const { state } = useLocation();
  const [proofRequest, setProofRequest] = useState('');
  useEffect(() => {
    const params = new URLSearchParams(window.location.search) // id=123
    let proof_request = params.get('proof_request')
    if (proof_request)
      setProofRequest(proof_request);
      //alert("Do you want to create a new identity for: "+proof_request +"?");
  }, [])
  const submitNo = () => {
    alert("No pressed")
  };
  const submitYes = () => {
    const { trapdoor, nullifier, commitment } = new Identity()
    alert ("Commitment: "+commitment + "\nTrapdoor: "+trapdoor+"\nNullifier"+nullifier);

    var identities = JSON.parse(localStorage.getItem("identities") || "[]");
    var identity = {name:proofRequest, commitment: commitment.toString(), trapdoor: trapdoor.toString(), nullifier: nullifier.toString()};
    identities.push(identity);
    localStorage.setItem("identities", JSON.stringify(identities));
    alert("Identity saved")

  };
  return (
  <div>
    {/*<header>
    <Link to={"/identitylist"}>hello</Link>
    </header>*/}
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