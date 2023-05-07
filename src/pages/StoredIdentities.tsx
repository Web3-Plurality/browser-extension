import { ListGroup } from "react-bootstrap";
import "../styles/App.css";
import "../styles/bootstrap.css";
import logo from '../images/logo.png';
import { useState } from "react";
import { sendIdentityCommitmentFromPopup } from "../contentScript/contentScript";

export function StoredIdentities() {
  const [activeName, setActiveName] = useState("");
  var identities = JSON.parse(localStorage.getItem("identities") || "[]");
  const initialData: any[] | (() => any[]) = identities;
  const [list] = useState(initialData);

  const ListItem = ({ name, onClick }: { name:string, onClick: any }) => (
    <div className={activeName==name ? "active list-group-item" : "list-group-item" }>
      <span> </span>
      <p onClick={() => onClick(name)} > {name} </p>
    </div>
  );
  
  
  const displayItem = (name:string) => {
    const item = list.filter(item => item.name == name);
    setActiveName(name);
    alert ("Commitment: "+item[0].commitment + "\nTrapdoor: "+item[0].trapdoor+"\nNullifier"+item[0].nullifier);
    sendIdentityCommitmentFromPopup(JSON.stringify(item[0].commitment));
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
        <ListItem className="list-group-item"  key={item.name} {...item} onClick={displayItem}/>
      ))}
      </ListGroup>
      </div>
    </div>
  );
}
  
export default StoredIdentities;