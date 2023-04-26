import { ListGroup } from "react-bootstrap";
import "../App.css";
import "../bootstrap.css";
import logo from '../images/logo.png';
import { Identity } from "@semaphore-protocol/identity"
import { useState } from "react";



function SecondPage() {
  const initialData: any[] | (() => any[]) = [
    //{ id: 0, trapdoor: "trapdoor", nullifier: "nullifier", commitment: "commitment" },
  ];
  
  const ListItem = ({ trapdoor , nullifier, commitment, id, onRemoveClick, onClick }: { trapdoor:string , nullifier:string, commitment: string, id:number, onRemoveClick:any, onClick: any }) => (
    <div className="list-group-item">
      <span> </span>
      <p onClick={() => onClick(id)} > Identity {id} 
        {/*<button style={{backgroundColor:'#DE3163', borderColor: '#DE3163', color:'#FFFFFF', alignSelf: 'right'}} onClick={() => onRemoveClick(id)}>x</button>*/}
      </p>
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
      //TODO: Do thorough testing before using this
      updateList(list.filter(item => item.id !== id));
    };

    const displayItem = (id:number) => {
      const item = list.filter(item => item.id == id);
      //TODO: Create a new page for showing details of an identity
      alert (JSON.stringify(item));
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
        <ListItem className="list-group-item" key={item.id} {...item} onRemoveClick={removeItem} onClick={displayItem} />
      ))}
      </ListGroup>
      </div>
    </div>
    );
  }
  
  export default SecondPage;