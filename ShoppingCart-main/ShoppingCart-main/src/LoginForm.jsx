import { useState } from 'react';
import logo from './logo.jpg';

function LoginForm({ onLogin }) {

  const [username, setUsername] = useState('');

  function onChange(e) {
    setUsername(e.target.value);
  }

  function onSubmit(e) {
    e.preventDefault(); 
      onLogin(username); 
  }

  return (
    <div>
      <div className='logo'>
          <img className='login-img' src={logo} alt='e-shop'></img>
        </div>
      <div className="login-content">
        <h1 className='login-heading'>Login </h1>
        <form className="form-login" action="#/login" onSubmit={onSubmit}>
          <label className="input-block">
            <span className='span-content'>Username:</span>
            <input className="btn-submit" placeholder='Enter Username' 
                      value={username} onChange={onChange}/>
          </label>
          <button className="btn-login" type="submit">Login</button>
        </form>
      </div>
    </div>
  );

}

export default LoginForm;