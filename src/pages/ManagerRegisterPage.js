import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const ManagerRegisterPage = () => {

  const [email, setEmail] = useState("");
  const [username, setUsername] = useState("");
  const [tel, setTel] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({ email, username, tel, password,firstName,lastName,companyName,birthDate });
    setEmail("");
    setTel("");
    setUsername("");
    setPassword("");
    setBirthDate("");
    setFirstName("");
    setLastName("");
    setCompanyName("");
  };
  
  const gotoManagerLoginPage = () => navigate("/managerLoginPage");

  return (
    <div className='signup__container'>
            <h2>Register </h2>
            <form className='signup__form' onSubmit={handleSubmit}>
                
                <label htmlFor='email'>Email Address</label>
                <input
                    type='email'
                    name='email'
                    id='email'
                    value={email}
                    required
                    onChange={(e) => setEmail(e.target.value)}
                />
                
                <label htmlFor='username'>Username</label>
                <input
                    type='text'
                    id='username'
                    name='username'
                    value={username}
                    required
                    onChange={(e) => setUsername(e.target.value)}
                />
                
                <label htmlFor='tel'>Phone Number</label>
                <input
                    type='tel'
                    name='tel'
                    id='tel'
                    value={tel}
                    required
                    onChange={(e) => setTel(e.target.value)}
                />
                
                <label htmlFor='tel'>Password</label>
                <input
                    type='password'
                    name='password'
                    id='password'
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />

                <label htmlFor='firstName'>First name</label>
                <input
                    type='firstName'
                    name='firstName'
                    id='firstName'
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                />

                <label htmlFor='lastName'>Last name</label>
                <input
                    type='lastName'
                    name='lastName'
                    id='lastName'
                    required
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                />

                <label htmlFor='companyName'>Company name</label>
                <input
                    type='companyName'
                    name='companyName'
                    id='companyName'
                    required
                    value={companyName}
                    onChange={(e) => setCompanyName(e.target.value)}
                />

                <label htmlFor='birthDate'>Birth date</label>
                <input
                    type='birthDate'
                    name='birthDate'
                    id='birthDate'
                    placeholder="Example: 2001-04-25"
                    required
                    value={birthDate}
                    onChange={(e) => setBirthDate(e.target.value)}
                />

                <button className='signupBtn aleksaBtn'>Register</button>
                <p>
                    Already have an account?{" "}
                    <span className='link' onClick={gotoManagerLoginPage}>
                        Login
                    </span>
                </p>
            </form>
        </div>
  )
}

export default ManagerRegisterPage
