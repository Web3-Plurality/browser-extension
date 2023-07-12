import "../styles/App.css";
import "../styles/bootstrap.css";
import logo from '../images/logo.png';
import { useNavigate } from "react-router-dom"
import { useState } from 'react'
import { Button, Form } from 'react-bootstrap';
import { ModalBox } from "../components/ModalBox"

function Home() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [modalTitle, setModalTitle] = useState('');
  const [modalBody, setModalBody] = useState('');

  const [show, setShow] = useState(false);
  const [caller, setCaller] = useState('');

  //TODO: Pull modal dialog out into a component and use in all corresponding pages
  const handleClose = () => {
    setShow(false);
    // do not close or redirect on invalid login, just close the modal and allow the user to try the login again
  }
  const handleShow = (title: string, body: string, callerFunc: string) => {
    setCaller(callerFunc);
    setModalTitle(title);
    setModalBody(body);
    setShow(true);
  }

  const handleUsernameChange = (event: any) => {
    setUsername(event.target.value);
  };
  const handlePasswordChange = (event: any) => {
    setPassword(event.target.value);
  };

  const onSubmit = () => {
    if (username === 'admin' && password === 'admin')
      navigate('/storedidentities');
    else
      //alert("Invalid username or password")
      handleShow("Invalid Credentials", "Invalid username or password","onSubmit");

  } 
  return (
    <div>
      <section className="vh-100" >
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-6 text-black">
              <div className="my-5 d-flex justify-content-center">
                <img src={logo} alt={"Plurality"} style={{ width: '22px', height: '26px'}} className="mt-1"/>
                <h1 className="fw-bold my-auto">lurality</h1> 
              </div>

        <div className="d-flex align-items-center justify-content-center h-custom-2 px-5 ms-xl-4 mt-5 pt-xl-0 mt-xl-n5 App">

          <Form className="mt-5" style={{width: '23rem'}}>

            <Form.Group controlId="formEmail" className="mb-3 text-start">
              {/*<Form.Label>Username</Form.Label>*/}
              <Form.Control type="email" placeholder="Username" onChange={handleUsernameChange}/>
            </Form.Group>

            <Form.Group controlId="formPassword" className="mb-3 text-start">
              {/*<Form.Label>Password</Form.Label>*/}
              <Form.Control type="password" placeholder="Password" onChange={handlePasswordChange}/>
            </Form.Group>
            <Button className="mb-3" variant="secondary" onClick={onSubmit} style={{backgroundColor:'#DE3163', borderColor: '#DE3163', color:'#FFFFFF', alignSelf: 'stretch', width: '100%'}}> Login </Button>

            <p className="small mb-5 pb-lg-2"><a className="text-muted" href="#!">Forgot password?</a></p>
            <p>Don't have an account? <a href="#!" className="link-info">Register here</a></p>

          </Form>

        </div>
      </div>
      
    </div>
  </div>
  </section>
  <ModalBox show={show} modalTitle={modalTitle} modalBody={modalBody} handleClose={handleClose} />
  </div>  
  );
}

export default Home;