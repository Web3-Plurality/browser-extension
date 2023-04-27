import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useEffect } from 'react'
import "../App.css";
import "../bootstrap.css";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useSpring, animated } from '@react-spring/web';

import logo from '../images/logo.png';

function IdentityPage() {
  const navigate = useNavigate();
  const { state } = useLocation();

  useEffect(() => {
    alert(state.toString())
  }, [])
  return (
  <div>
    <header>
    <Link to={"/second"}>hello</Link>
    </header>
  </div>
  );
  }
  
  export default IdentityPage;