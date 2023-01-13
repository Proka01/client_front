import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ManagerLoginPage = () => {

  const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

  const handleSubmit = (e) => {
      e.preventDefault();
      console.log({ username, password });
      setPassword("");
      setUsername("");
  };

  const gotoManagerRegisterPage = () => navigate("/managerRegisterPage");


  return (
    <div className='login__container'>
            <h2>Login </h2>
            <form className='login__form' onSubmit={handleSubmit}>
                <label htmlFor='username'>Username</label>
                <input
                    type='username'
                    id='username'
                    name='username'
                    value={username}
                    required
                    onChange={(e) => setUsername(e.target.value)}
                />
                <label htmlFor='password'>Password</label>
                <input
                    type='password'
                    name='password'
                    id='password'
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button className='loginBtn aleksaBtn'>Register</button>
                <p>
                    Don't have an account?{" "}
                    <span className='link' onClick={gotoManagerRegisterPage}>
                        Register
                    </span>
                </p>
            </form>
        </div>
  )
}

export default ManagerLoginPage
