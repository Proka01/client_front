import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { clientLogin } from '../web2Communication';

const ClientLoginPage = () => {

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const gotoClientRegisterPage = () => navigate("/clientRegisterPage");

  // imamo log in btn, ali njemu nije dodeljen onClick
  //<form> by default bi trebalo da ima dugme sa submitovanje forme
  //i zato forma ima svoj onSubmit
  //react skonta da formin onsubmit treba da okine na klik login dugmeta iako nisu spojeni
 const handleSubmit = async (e) =>{
	e.preventDefault();
    console.log({ username, password });

	//web2 http request
	let token = await clientLogin(username, password);
	localStorage.setItem("Token",token);
	
	console.log("Token from JSON:");
	console.log(token);

    // setPassword("");
    // setUsername("");
 } 

  return (
    <div className='login__container'>
			<h2>Login </h2>
			<form className='login__form' onSubmit={handleSubmit}>
				
        <label htmlFor='username'>Username</label>
				<input
					type='text'
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
				<button className='loginBtn aleksaBtn'>LOGIN</button>
				
        <p>
					Don't have an account?{" "}
					<span className='link' onClick={gotoClientRegisterPage}>
						Register!
					</span>
				</p>

			</form>
		</div>
  )
}

export default ClientLoginPage
