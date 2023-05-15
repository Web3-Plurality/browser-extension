import { ListGroup } from "react-bootstrap";
import "../styles/App.css";
import "../styles/bootstrap.css";
import logo from '../images/logo.png';
import { useState, useEffect } from "react";
import { sendFullProof } from "../contentScript/contentScript";
import { Group } from "@semaphore-protocol/group";
import { generateProof } from "@semaphore-protocol/proof";
import { Identity } from "@semaphore-protocol/identity";


export function CreateProof() {
  const [activeName, setActiveName] = useState("");
  var identities = JSON.parse(localStorage.getItem("identities") || "[]");
  const initialData: any[] | (() => any[]) = identities;
  const [list] = useState(initialData);
  let groupId: number;
  let identityCommitments: [];

  useEffect(() => {
    // get the proof request params for this popup
    console.log("HERE IN CREATE PROOF");
    const params = new URLSearchParams(window.location.search)
    let proof_request:any = params.get('proof_request')
    console.log("Received params: ");
    console.log(proof_request);
    // if dapp requested for an identity, we expect a proof request name
    if (proof_request) {
      proof_request = JSON.parse(proof_request);
      groupId = proof_request.groupId;
      console.log("Group Id is : "+groupId);
      identityCommitments = proof_request.identityCommitments;
      console.log("Identity commitments are: "+ identityCommitments);
    }
    // otherwise throw an error
    else
      alert("Error: Expecting a proof name from dApp but didn't get any");
  }, [])
  
  const ListItem = ({ name, onClick }: { name:string, onClick: any }) => (
    <div className={activeName==name ? "active list-group-item" : "list-group-item" }>
      <span> </span>
      <p onClick={() => onClick(name)} > {name} </p>
    </div>
  );
  
  
  const displayItem = async (name:string) => {
    const item = list.filter(item => item.name == name);
    setActiveName(name);
    
    // retrieving the selected identity from the list
    const storedIdentity = item[0].storedIdentity;
    const selectedIdentity = new Identity(storedIdentity);
    console.log("Commitment: "+selectedIdentity.getCommitment());
    console.log("Nullifier: "+selectedIdentity.getNullifier());
    console.log("Trapdoor: "+selectedIdentity.getTrapdoor());
    
    alert ("Commitment: "+selectedIdentity.commitment + "\nTrapdoor: "+selectedIdentity.trapdoor+"\nNullifier"+selectedIdentity.nullifier);

    // recreating the group from the commitments received
    const group = new Group(groupId);
    group.addMembers(identityCommitments);
    const signal = 1; // this value doesnt matter

    const index = group.indexOf(BigInt(selectedIdentity.commitment)) // 0
    console.log(index);
    const merkelProof = await group.generateMerkleProof(index);  
    console.log(merkelProof); 


    const iframe = (document.getElementById('sandbox') as HTMLIFrameElement);
    console.log(iframe);
    window.addEventListener('message', (event) => {
      console.log('Generated ZK Proof: ', event.data);
      sendFullProof(event.data);
    });

    iframe.contentWindow!!.postMessage({"message":"It works!!", "identity": storedIdentity, "groupId": groupId, "merkleProof": merkelProof, "signal": signal}, "*");
    console.log("Message posted to iframe");

  }
  
    
  return (
    <div>
      <span className="h1 fw-bold mb-0 center">
        <img src={logo} alt={"Login image"} style={{ width: '25px', height: '30px', marginBottom:'2px'}}/>
          Plurality
      </span>
      <div className="col-12" style={{marginTop: '10px'}}>
        <p>Choose the proof generation entry</p>
      <ListGroup>
      {list.map(item => (
        <ListItem className="list-group-item"  key={item.name} {...item} onClick={displayItem}/>
      ))}
      </ListGroup>
      </div>
      <iframe src="sandbox.html" id="sandbox" style={{display: "none"}}></iframe>
    </div>
  );
}
  
export default CreateProof;