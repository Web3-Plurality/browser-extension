import "../App.css";
import "../bootstrap.css";
import logo from '../images/logo.png';
import { useNavigate } from "react-router-dom"
import { useState } from 'react'


function HomePage() {
  const navigate = useNavigate()
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (event: any) => {
    setUsername(event.target.value);
  };
  const handlePasswordChange = (event: any) => {
    setPassword(event.target.value);
  };

  const onSubmit = () => {
    if (username === 'admin' && password === 'admin')
      navigate('/identitylist');
    else
      alert("Invalid username or password")
  } 
  return (
    <div>
      <section className="vh-100" >
      <div className="container-fluid">
        <div className="row">
          <div className="col-sm-6 text-black">
              <span className="h1 fw-bold mb-0 center">
                <img src={logo} alt={"Login image"} style={{ width: '25px', height: '30px', marginBottom:'2px'}}/>
                  Plurality
              </span>

        <div className="d-flex align-items-center h-custom-2 px-5 ms-xl-4 mt-5 pt-5 pt-xl-0 mt-xl-n5 App">

          <form style={{width: '23rem'}}>

            <h3 className="fw-normal mb-3 pb-3" style={{letterSpacing: '1px'}}>Log in</h3>

            <div className="form-outline mb-4">
              <input type="email" id="form2Example18" className="form-control form-control-lg" placeholder="username" onChange={handleUsernameChange} />
            </div>

            <div className="form-outline mb-4">
              <input type="password" id="form2Example28" className="form-control form-control-lg" placeholder='password' onChange={handlePasswordChange}/>
            </div>

            <div className="form-outline pt-1 mb-4">
              <button className="btn btn-info btn-lg btn-block" type="button" onClick={onSubmit} style={{backgroundColor:'#DE3163', borderColor: '#DE3163', color:'#FFFFFF',alignSelf: 'stretch'}}>Login</button>
            </div>

            <p className="small mb-5 pb-lg-2"><a className="text-muted" href="#!">Forgot password?</a></p>
            <p>Don't have an account? <a href="#!" className="link-info">Register here</a></p>

          </form>

        </div>
      </div>
      
    </div>
  </div>
  </section>
    </div>
    
  );
}

export default HomePage;