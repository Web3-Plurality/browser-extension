import { useEffect, useState } from 'react'
import "../styles/App.css";
import "../styles/bootstrap.css";
import logo from '../images/logo.png';
import { Identity } from "@semaphore-protocol/identity";
import "../utils/BigIntUtils";
import { ModalBox } from "../components/ModalBox"
import { sendFullProof } from "../contentScript/contentScript";
import { Group } from "@semaphore-protocol/group";

export function RequestProofCreation() {
  const [proofRequestName, setProofRequestName] = useState('');
  const [groupId, setGroupId] = useState(0);
  const [identityCommitments, setIdentityCommitments] = useState([]);

  const [modalTitle, setModalTitle] = useState('');
  const [modalBody, setModalBody] = useState('');

  const [show, setShow] = useState(false);
  const [caller, setCaller] = useState('');

  const handleClose = () => {
    setShow(false);
    if (caller === "submitNo" || caller === "displayItem") {
      window.close();
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
    let proof_request:any = params.get('proof_request')
    console.log("Received proof request: "+ proof_request);
    // if dapp requested for an identity, we expect a proof request name
    if (proof_request)
    { 
      proof_request = JSON.parse(proof_request);
      console.log(proof_request);
      setProofRequestName(proof_request.title);
      setGroupId(proof_request.groupId);
      setIdentityCommitments(proof_request.identityCommitments);
    }
    // otherwise throw an error
    else
      //alert("Error: Expecting a proof name from dApp but didn't get any");
      handleShow("Error", "Expecting a proof name from dApp but didn't get any", "error");
  }, [])
  
  const createZKProof= async (item: any) => {
    // retrieving the selected identity from the list
    const storedIdentity = item[0].storedIdentity;
    const selectedIdentity = new Identity(storedIdentity);
    // recreating the group from the commitments received
    const group = new Group(groupId);
    group.addMembers(identityCommitments);
    const signal = 1; // this value doesnt matter

    // passing around group object between scripts require proper type casting
    // same proof can be generated using merkelProofs, which are much easier to pass around
    // therefore, let's take the easier approach 
    const index = group.indexOf(BigInt(selectedIdentity.commitment)) 
    console.log(index);
    const merkelProof = await group.generateMerkleProof(index);  
    console.log(merkelProof); 


    // generateProof uses unsafe eval() functions, so it cannot be run in extension context
    // so we create an iframe that runs in sandbox env where this function can be run
    // extract the iframe that is running in sandbox environment
    const iframe = (document.getElementById('sandbox') as HTMLIFrameElement);
    console.log(iframe);

    // register event for the response from the iframe
    window.addEventListener('message', (event) => {
      console.log('Generated ZK Proof: ', event.data);
      // the sandboxed iframe returns the generated proof
      // we need to send this proof to the browser/dApp
      // calling function in content script
      sendFullProof(event.data, selectedIdentity.commitment);
      //alert("ZK Proof sent to the requesting application");
      handleShow("Proof Sent", "ZK Proof sent to the requesting application","displayItem")

    });

    // send the proof generation message with params to the sandboxed iframe
    iframe.contentWindow!!.postMessage({"message":"It works!!", "identity": storedIdentity, "groupId": groupId, "merkleProof": merkelProof, "signal": signal}, "*");
    console.log("ZK Proof Generation request posted to sandboxed iframe");
  }

  const submitNo = async () => {
    handleShow("Closing", "Will not respond to this request. Closing","submitNo");
  };

  const submitYes = () => {
    var identities = JSON.parse(localStorage.getItem("identities") || "[]");
    let item = identities.filter((e: { name: string }) => e.name === proofRequestName);
    if (item.length > 0) {
      console.log(item);
      createZKProof(item);
    }
    else 
    {
      handleShow("Closing", "No matching identity found. Please create one first with the dApp. Closing","submitNo");
    }
  };
  return (
  <div>
    <span className="h1 fw-bold mb-0 center">
      <img src={logo} alt={"Login image"} style={{ width: '25px', height: '30px', marginBottom:'2px'}}/>
        Plurality
    </span>
    <div className='center'>
    <p>Do you want to create a zk proof for <b>{proofRequestName}</b>?</p>
    <button className="btn btn-info btn-lg btn-block" type="button" onClick={submitNo} style={{backgroundColor:'#DE3163', borderColor: '#DE3163', color:'#FFFFFF'}}>No</button>
    &nbsp;&nbsp;
    <button className="btn btn-info btn-lg btn-block" type="button" onClick={submitYes} style={{backgroundColor:'#DE3163', borderColor: '#DE3163', color:'#FFFFFF'}}>Yes</button>
    <iframe src="sandbox.html" id="sandbox" style={{display: "none"}}></iframe>
    <ModalBox show={show} modalTitle={modalTitle} modalBody={modalBody} handleClose={handleClose} />
    </div>
  </div>
  );
  }
  
  export default RequestProofCreation;