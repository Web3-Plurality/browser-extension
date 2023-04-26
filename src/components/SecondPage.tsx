import "../App.css";
import "../bootstrap.css";
import logo from '../images/logo.png';
import { Identity } from "@semaphore-protocol/identity"
import ListGroup from 'react-bootstrap/ListGroup';
import React, { useState } from "react";



function SecondPage() {
  const initialData: any[] | (() => any[]) = [
    //{ id: 0, trapdoor: "trapdoor", nullifier: "nullifier", commitment: "commitment" },
  ];
  
  const ListItem = ({ trapdoor , nullifier, commitment, id, onRemoveClick, onClick }: { trapdoor:string , nullifier:string, commitment: string, id:number, onRemoveClick:any, onClick: any }) => (
    <div onClick={() => onClick(id)}>
      {commitment.toString()}
      <span> </span>
      <button onClick={() => onRemoveClick(id)}>x</button>

    </div>
  );
  
    const [list, updateList] = useState(initialData);
  
    const addItem = () => {
      const { trapdoor, nullifier, commitment } = new Identity()

      const newList = [
        ...list,
        { id: list.length, trapdoor: trapdoor.toString(), nullifier: nullifier.toString(), commitment: commitment.toString() }
      ];
      updateList(newList);
    };
    const removeItem = (id:number) => {
      updateList(list.filter(item => item.id !== id));
    };

    const displayItem = (id:number) => {
      const item = list.filter(item => item.id == id);
      alert (id + JSON.stringify(item));
    }
  
    return (
      <div>
      <span className="h1 fw-bold mb-0 center">
        <img src={logo} alt={"Login image"} style={{ width: '25px', height: '30px', marginBottom:'2px'}}/>
          Plurality
      </span>
      <div className="col-12">
          <button className="btn btn-info btn-lg btn-block center" type="button" onClick={addItem} style={{backgroundColor:'#DE3163', borderColor: '#DE3163', color:'#FFFFFF'}}>+ Add New Identity</button>
      {list.map(item => (
        <ListItem class="list-group-item" key={item.id} {...item} onRemoveClick={removeItem} onClick={displayItem} />
      ))}
      </div>
    </div>
    );
  }
  
  export default SecondPage;