import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react'
import "../styles/App.css";
import "../styles/bootstrap.css";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useSpring, animated } from '@react-spring/web';

import logo from '../images/logo.png';

function Splash() {
    const navigate = useNavigate();
    // the logo appears from hidden to fully visible in 2 seconds
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
          // we need to see from where is this extension being launched and navigate accordingly
          const params = new URLSearchParams(window.location.search)
          let nav = "/"+params.get('nav')
          console.log(nav); 

          let proof_request = params.get('proof_request')
          console.log(proof_request); 

          // when dapp requests for identity, we send it to identity creation page
          if (nav === '/requestidentitycreation')
            navigate(nav+"?proof_request="+proof_request)
          // when dapp requests for proof, we send it to proof creation page
          else if (nav === '/createproof')
            navigate(nav+"?proof_request="+proof_request)
          // otherwise, the user has clicked the extension logo, so we take it to home page
          else
            navigate('/home')
        }, 2000)  // 2s because the style will make the logo fully visible in 2s
      }, [])

  return (
    /* TODO: Centralize the div on popup */
  <Container className="d-flex align-items-center justify-content-center text-center">
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
  
  export default Splash;