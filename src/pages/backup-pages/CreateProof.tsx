import { ListGroup } from "react-bootstrap";
import "../../styles/App.css";
import "../../styles/bootstrap.css";
import logo from '../../images/logo.png';
import { useState, useEffect } from "react";
import { sendFullProof } from "../../contentScript/contentScript";
import { Group } from "@semaphore-protocol/group";
import { Identity } from "@semaphore-protocol/identity";
import { ListItem } from "../../components/ListItem"
import { ModalBox } from "../../components/ModalBox"

export function CreateProof() {
  const [activeName, setActiveName] = useState("");
  var identities = JSON.parse(localStorage.getItem("identities") || "[]");
  const initialData: any[] | (() => any[]) = identities;
  const [list] = useState(initialData);
  let groupId: number;
  let identityCommitments: [];
  const [modalTitle, setModalTitle] = useState('');
  const [modalBody, setModalBody] = useState('');

  const [show, setShow] = useState(false);
  const [caller, setCaller] = useState('');

  const handleClose = () => {
    setShow(false);
    if (caller === "error" || caller === "displayItem") {
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
    console.log("Received create proof params: ");
    console.log(proof_request);

    // if dapp requested for an identity, we expect some params inside it
    if (proof_request) {
      proof_request = JSON.parse(proof_request);
      groupId = proof_request.groupId;
      identityCommitments = proof_request.identityCommitments;

      //TODO: Check why the iframe doesn't respond if we do this.
      let proof_request_name = proof_request.title.toString();
      if (proof_request_name) {
        console.log("Proof request name received in navigation is: "+ proof_request_name);
        displayItem(proof_request_name);
      }
    }
    // otherwise throw an error
    else
      //alert("Error: Expecting a proof name from dApp but didn't get any");
      handleShow("Error", "Expecting a proof name from dApp but didn't get any","error")
  }, [])
  
  // const ListItem = ({ name, onClick }: { name:string, onClick: any }) => (
  //   <div className={activeName==name ? "active list-group-item" : "list-group-item" }>
  //     <span> </span>
  //     <p onClick={() => onClick(name)} > {name} </p>
  //   </div>
  // );
  
  
  const displayItem = async (name:string) => {
    const item = list.filter(item => item.name == name);
    console.log("Item is: "+ item);
    setActiveName(name);
    console.log("In display item setting active name: "+ name);
    // retrieving the selected identity from the list
    const storedIdentity = item[0].storedIdentity;
    const selectedIdentity = new Identity(storedIdentity);
    console.log("Selected identity: "+ selectedIdentity);
    // recreating the group from the commitments received
    const group = new Group(groupId);
    group.addMembers(identityCommitments);
    const signal = 1; // this value doesnt matter

    console.log("Group created: "+ group);
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
  
    
  return (
    <div>
      <span className="h1 fw-bold mb-0 center">
        <img src={logo} alt={"Login image"} style={{ width: '25px', height: '30px', marginBottom:'2px'}}/>
          Plurality
      </span>
      <div className="col-12" style={{marginTop: '10px'}}>
        <p>Choose the proof generation entry</p>
      <ListGroup as="ol" className="list-group-numbered">
      {list.map(item => (
        <ListItem as="li" className="list-group-item"  key={item.name} {...item} activeName={activeName} onClick={displayItem}/>
      ))}
      </ListGroup>
      </div>
      <iframe src="sandbox.html" id="sandbox" style={{display: "none"}}></iframe>
      <ModalBox show={show} modalTitle={modalTitle} modalBody={modalBody} handleClose={handleClose} />
    </div>
  );
}
  
export default CreateProof;