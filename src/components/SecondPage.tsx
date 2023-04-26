import "../App.css";
import "../bootstrap.css";
import logo from '../images/logo.png';
import { Identity } from "@semaphore-protocol/identity"
import ListGroup from 'react-bootstrap/ListGroup';



function SecondPage() {
  const onSubmit = () => {
    //TODO: Add semaphore identity creation
    const { trapdoor, nullifier, commitment } = new Identity()

    alert("New identity: " + trapdoor); 
  } 
    return (
        <div>
          {/*<header className="App-header">
            <p>View History</p>
            <Link to="/">go back</Link>
          </header>*/}
              <span className="h1 fw-bold mb-0 center">
                <img src={logo} alt={"Login image"} style={{ width: '25px', height: '30px', marginBottom:'2px'}}/>
                  Plurality
              </span>
          <div className="col-12">
          <button className="btn btn-info btn-lg btn-block center" type="button" onClick={onSubmit} style={{backgroundColor:'#DE3163', borderColor: '#DE3163', color:'#FFFFFF'}}>+ Add New Identity</button>
          <ListGroup as="ul">
            <ListGroup.Item as="li" active>Cras justo odio</ListGroup.Item>
            <ListGroup.Item>Dapibus ac facilisis in</ListGroup.Item>
            <ListGroup.Item>Morbi leo risus</ListGroup.Item>
            <ListGroup.Item>Porta ac consectetur ac</ListGroup.Item>
            <ListGroup.Item>Vestibulum at eros</ListGroup.Item>
          </ListGroup>
          </div>
        </div>
      );
  }
  
  export default SecondPage;