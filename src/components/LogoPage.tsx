import { useNavigate } from 'react-router-dom';
import React, { useEffect } from 'react'
import "../App.css";
import "../bootstrap.css";
//import TextTransition, { presets } from 'react-text-transition';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

//const TEXTS = ["Plural Identity","Plurality" ];


import logo from '../images/logo.png';

function LogoPage() {
    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => {
          navigate('/home')
        }, 4000)
      }, [])
  
    /*const [index, setIndex] = React.useState(0);

    useEffect(() => {
    const intervalId = setInterval(
      () => setIndex((index) => index + 1),
      2000, // every 2 seconds
    );
    return () => clearTimeout(intervalId);
  }, []);*/

  return (
    /*<Container>
          <Row className="justify-content-md-center">
            <Col><img src={logo} alt={"None"} style={{width: '50px', height: '60px' }} /></Col>
          </Row>
          <Row className="justify-content-md-center">
          <Col><TextTransition className="display-3" springConfig={presets.molasses}>{TEXTS[index % TEXTS.length]}</TextTransition></Col>
          </Row>
  </Container>*/
  <Container className="text-center" style={{position:'relative', top: '50%'}}>
    <Row className="justify-content-md-center">
      <Col><img src={logo} alt={"None"} style={{width: '50px', height: '60px' }} /></Col>
    </Row>
    <Row className="justify-content-md-center">
      <Col className='display-3'>Plurality</Col>
    </Row>
  </Container>
  );
  }
  
  export default LogoPage;