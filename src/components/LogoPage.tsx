import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react'
import "../App.css";
import "../bootstrap.css";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const TEXTS = ["Plural Identity","Plurality" ];


import logo from '../images/logo.png';

function LogoPage() {
    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
          navigate('/home')
        }, 1000)
      }, [])

  return (
  <Container className="text-center" style={{position:'absolute', top: '40%'}}>
    <Row className="justify-content-md-center">
      <Col><img src={logo} alt={"None"} style={{width: '50px', height: '60px' }} /></Col>
    </Row>
    <Row className="justify-content-md-center">
      <Col className='display-3 fade-in'>Plurality</Col>
    </Row>
  </Container>
  );
  }
  
  export default LogoPage;