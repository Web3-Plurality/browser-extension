import { ListGroup } from "react-bootstrap";
import "../styles/App.css";
import "../styles/bootstrap.css";
import logo from '../images/logo.png';
import { useState, useEffect } from "react";
import { sendIdentityCommitmentFromPopup } from "../contentScript/contentScript";
import { Identity } from "@semaphore-protocol/identity";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

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

  const ListItem = ({ name, onClick }: { name:string, onClick: any }) => (
    <div className={activeName==name ? "active list-group-item" : "list-group-item" }>
      <span> </span>
      <p onClick={() => onClick(name)} > {name} </p>
    </div>
  );
  
  const displayItem = (name:string) => {
    const item = list.filter(item => item.name == name);
    setActiveName(name);
    const selectedIdentity = new Identity(item[0].storedIdentity);
    sendIdentityCommitmentFromPopup(JSON.stringify(selectedIdentity.commitment));
    handleShow("Identity Selected", "Sent selected identity to the browser/dApp","displayItem");
  }
  
  return (
    <div>
      <span className="h1 fw-bold mb-0 center">
        <img src={logo} alt={"Login image"} style={{ width: '25px', height: '30px', marginBottom:'2px'}}/>
          Plurality
      </span>
      <div className="col-12" style={{marginTop: '10px'}}>
      <ListGroup>
      {list.map(item => (
        <ListItem className="list-group-item"  key={item.name} {...item} onClick={{/*displayItem*/}}/>
      ))}
      </ListGroup>
      </div>
      <Modal size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered
      backdrop="static"
      keyboard={false}
      show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>{modalTitle}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{modalBody}</Modal.Body>
        <Modal.Footer>
          {/*<Button variant="secondary" onClick={handleClose}>
            Close
          </Button>*/}
          {/* TODO: Pick button styles from a css file */}
          <Button variant="primary" onClick={handleClose} style={{backgroundColor:'#DE3163', borderColor: '#DE3163', color:'#FFFFFF'}}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}
  
export default StoredIdentities;