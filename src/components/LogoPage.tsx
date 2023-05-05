import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react'
import "../App.css";
import "../bootstrap.css";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useSpring, animated } from '@react-spring/web';

import logo from '../images/logo.png';

function LogoPage() {
    const navigate = useNavigate();
    const styles = useSpring({
      from: {
        opacity: 0
      },
      to: {
        opacity: 1
      },
      config: {
        duration: 2000
    }
    })
    useEffect(() => {
        setTimeout(() => {
          const params = new URLSearchParams(window.location.search) // id=123
          let nav = "/"+params.get('nav')
          let proof_request = params.get('proof_request')
          if (nav === '/identity')
            navigate(nav+"?proof_request="+proof_request)
          else
            navigate('/home')
        }, 2000)
      }, [])

  return (
  <Container className="text-center" style={{position:'absolute', top: '40%'}}>
        <animated.div style={styles} >
    <Row className="justify-content-md-center">
      <Col><img src={logo} alt={"None"} style={{width: '50px', height: '60px' }} /></Col>
    </Row>
    <Row className="justify-content-md-center">
      <Col className='display-3'>Plurality</Col>
    </Row>
    </animated.div>
  </Container>
  );
  }
  
  export default LogoPage;