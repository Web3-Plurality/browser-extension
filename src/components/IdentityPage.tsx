import { Link, useLocation } from 'react-router-dom';
import { useEffect } from 'react'
import "../App.css";
import "../bootstrap.css";

function IdentityPage() {
  const { state } = useLocation();

  useEffect(() => {
    alert(state.toString())
  }, [])
  return (
  <div>
    <header>
    <Link to={"/identitylist"}>hello</Link>
    </header>
  </div>
  );
  }
  
  export default IdentityPage;