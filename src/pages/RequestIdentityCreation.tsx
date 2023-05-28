import { useEffect, useState } from 'react'
import "../styles/App.css";
import "../styles/bootstrap.css";
import logo from '../images/logo.png';
import { Identity } from "@semaphore-protocol/identity";
import { useNavigate } from "react-router-dom";
import "../utils/BigIntUtils";
import { ModalBox } from "../components/ModalBox"
import { sendIdentityCommitmentFromPopup } from "../contentScript/contentScript";


function RequestIdentityCreation() {
  const navigate = useNavigate()
  const [proofRequest, setProofRequest] = useState('');
  const [modalTitle, setModalTitle] = useState('');
  const [modalBody, setModalBody] = useState('');
  const [identity, setIdentity] = useState<Identity>();
  const [show, setShow] = useState(false);
  const [caller, setCaller] = useState('');
  
  //let identity: Identity;

  const handleClose = () => {
    setShow(false);
    if (caller === "submitNo") {
      window.close();
    }
    else if (caller === "submitYes") {
      sendIdentityCommitmentFromPopup(JSON.stringify(identity?.commitment));
      handleShow("Identity Sent", "Sent selected identity to the browser/dApp","submitNo");
    }
    // in all other cases do nothing
  }
  const handleShow = (title: string, body: string, callerFunc: string) => {
    setCaller(callerFunc);
    setModalTitle(title);
    setModalBody(body);
    setShow(true);
  }
  useEffect(() => {
    // get the proof request params for this popup
    const params = new URLSearchParams(window.location.search)
    let proof_request = params.get('proof_request')
    // if dapp requested for an identity, we expect a proof request name
    if (proof_request)
      setProofRequest(proof_request);
    // otherwise throw an error
    else
      //alert("Error: Expecting a proof name from dApp but didn't get any");
      handleShow("Error", "Expecting a proof name from dApp but didn't get any", "error");
  }, [])
  
  const submitNo = async () => {
    handleShow("Closing", "Will not respond to this request. Closing","submitNo");
  };

  const submitYes = () => {

    var identities = JSON.parse(localStorage.getItem("identities") || "[]");
    let item = identities.filter((e: { name: string }) => e.name === proofRequest); 
    if (item.length > 0) {
      /* identities already contains the element we're trying to create */
      const selectedIdentity = new Identity(item[0].storedIdentity);
      setIdentity(selectedIdentity);
      handleShow("Identity Already Exists", "Identity with this name already exists. Reusing it", "submitYes");
    }
    else 
    {
      const newIdentity = new Identity();
      var iden = {name:proofRequest, storedIdentity: newIdentity.toString()};
      identities.push(iden);
      localStorage.setItem("identities", JSON.stringify(identities));
      setIdentity(newIdentity);
      handleShow("Identity Created", "Sending selected identity to the browser/dApp","submitYes");
    }
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
    <ModalBox show={show} modalTitle={modalTitle} modalBody={modalBody} handleClose={handleClose} />
    </div>
  </div>
  );
  }
  
  export default RequestIdentityCreation;