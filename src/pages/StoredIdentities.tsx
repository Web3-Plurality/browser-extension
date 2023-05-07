import { ListGroup } from "react-bootstrap";
import "../App.css";
import "../bootstrap.css";
import logo from '../images/logo.png';
import { useState, useEffect } from "react";
import { sendIdentityCommitmentFromPopup } from "../contentScript/contentScript";

export function StoredIdentitiesPage() {
  const [activeName, setActiveName] = useState("");

  var identities = JSON.parse(localStorage.getItem("identities") || "[]");

  const initialData: any[] | (() => any[]) = identities;

  const ListItem = ({ trapdoor , nullifier, commitment, name, onRemoveClick, onClick }: { trapdoor:string , nullifier:string, commitment: string, name:string, onRemoveClick:any, onClick: any }) => (
    <div className={activeName==name ? "active list-group-item" : "list-group-item" }>
      <span> </span>
      <p onClick={() => onClick(name)} > {name} </p>
    </div>
  );
  
    const [list] = useState(initialData);
  
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
  
export default StoredIdentitiesPage;