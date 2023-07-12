import { ListGroup } from "react-bootstrap";
import "../styles/App.css";
import "../styles/bootstrap.css";
import logo from '../images/logo.png';
import { useState, useEffect } from "react";
import { Identity } from "@semaphore-protocol/identity";
import { ListItem } from "../components/ListItem"
import { ModalBox } from "../components/ModalBox"

export function StoredIdentities() {
  const [activeName, setActiveName] = useState("");
  var identities = JSON.parse(localStorage.getItem("identities") || "[]");
  const initialData: any[] | (() => any[]) = identities;
  const [list] = useState(initialData);
  const [modalTitle, setModalTitle] = useState('');
  const [modalBody, setModalBody] = useState('');

  const [show, setShow] = useState(false);
  const [caller, setCaller] = useState('');

  useEffect(() => {
    // get the proof request params for this popup
    const params = new URLSearchParams(window.location.search)
    console.log("Received params: "+ params);
    let proof_request = params.get('proof_request_name')
    if (proof_request)
    {
      console.log(`Received proof request name ${proof_request} in navigation so directly selecting it`);
      displayItem(proof_request);
    }
    // otherwise allow user to see the identities in a list
  }, [])
  
  const handleClose = () => {
    setShow(false);
    if (caller === "displayItem") {
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
  
  const displayItem = (name:string) => {
    const item = list.filter(item => item.name === name);
    setActiveName(name);
    const selectedIdentity = new Identity(item[0].storedIdentity);
    const message = "Commitment: "+ selectedIdentity.getCommitment().toString() + "\n" +
                    "Trapdoor: "+ selectedIdentity.getTrapdoor().toString() + "\n" + 
                    "Nullifier: "+selectedIdentity.getNullifier().toString();
    handleShow("Identity Details",message,"displayItem");
    //TODO: Create a new page that shows all details of this item
  }
  
  return (
    <div>
      <span className="h1 fw-bold mb-0 center">
        <img src={logo} alt={"Logo"} style={{ width: '20px', height: '24px'}} className="mb-2"/>
          lurality
      </span>
      <h3 className="text-center" style={{marginTop: '30px'}}>Available Identities</h3>
      <div className="col-12" style={{marginTop: '15px'}}>
      <ListGroup as="ol" className="list-group-numbered">
      {list.map(item => (
        <ListItem style={{ marginBottom:'5px'}} key={item.name} {...item} activeName={activeName} onClick={displayItem}/>
      ))}
      </ListGroup>
      </div>
      <ModalBox show={show} modalTitle={modalTitle} modalBody={modalBody} handleClose={handleClose} />
    </div>
  );
}
  
export default StoredIdentities;