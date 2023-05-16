import { ListGroup } from "react-bootstrap";
import "../styles/App.css";
import "../styles/bootstrap.css";
import logo from '../images/logo.png';
import { Identity } from "@semaphore-protocol/identity"
import { useState } from "react";
import { sendIdentityCommitment } from "../contentScript/contentScript";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

export function AddNewIdentity() {
  const [activeId, setActiveId] = useState(0);
  const initialData: any[] | (() => any[]) = [];
  const [list, updateList] = useState(initialData);
  const [modalTitle, setModalTitle] = useState('');
  const [modalBody, setModalBody] = useState('');

  const [show, setShow] = useState(false);
  const [caller, setCaller] = useState('');

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

  const ListItem = ({ id, onClick }: { id:number, onClick: any }) => (
    <div className={activeId==id ? "active list-group-item" : "list-group-item" }>
      <span> </span>
      <p onClick={() => onClick(id)} > Identity {id} 
      </p>
    </div>
  );
  
  
  const addItem = () => {

    //TODO: Unify the list structure in the entire extension
    // the popups use the format {name:"", selectedIdentity: identity.toString()}
    // here we are storing the identity in the trapdoor nullifier commitment format
    const { trapdoor, nullifier, commitment } = new Identity()
      const newList = [
        ...list,
        { id: list.length, trapdoor: trapdoor.toString(), nullifier: nullifier.toString(), commitment: commitment.toString(), isSelected: false }
      ];
      updateList(newList);
  };

  const removeItem = (id:number) => {
    //TODO: Do thorough testing before using this because multiple entries with same ids can be possible
    // if deletion is done from mid and then new entries are added
    // so thoroughly test before using
    updateList(list.filter(item => item.id !== id));
  };

  const displayItem = (id:number) => {
    const item = list.filter(item => item.id == id);
    setActiveId(id);
    sendIdentityCommitment(JSON.stringify(item[0].commitment));
    //handleShow("Identity Selected", "Commitment: "+item[0].commitment + "\nTrapdoor: "+item[0].trapdoor+"\nNullifier: "+item[0].nullifier,"displayItem");
    handleShow("Identity Selected", "Sent selected identity to the browser/dApp","displayItem");
    
  }
    
  return (
    <div>
      <span className="h1 fw-bold mb-0 center">
        <img src={logo} alt={"Login image"} style={{ width: '25px', height: '30px', marginBottom:'2px'}}/>
          Plurality
      </span>
      <div className="col-12">
          <button className="btn btn-info btn-lg btn-block center" type="button" onClick={addItem} style={{backgroundColor:'#DE3163', borderColor: '#DE3163', color:'#FFFFFF'}}>+ Add New Identity</button>
      <ListGroup>
      {list.map(item => (
        <ListItem className="list-group-item"  key={item.id} {...item} onRemoveClick={removeItem} onClick={displayItem}/>
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
  
export default AddNewIdentity;