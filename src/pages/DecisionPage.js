import React from 'react';
import "../style/decisionPageStyle.css";
import Header from "../components/Header";
import { useNavigate } from 'react-router-dom';

const DecisionPage = () => {

    const navigate = useNavigate();

    function clientClick() {
        navigate("/clientLoginPage");
    }
    
    function managerClick() {
        navigate("/managerLoginPage");
    }
    
    function adminClick() {
        navigate("/adminLoginPage");
    }

    return (
        <div>
        <div className='mainContainer'>
                <Header />
                <div className='buttonsDiv'>
                    <div className='divBtn' onClick={clientClick} ><p className='text'>Client</p></div>
                    <div className='divBtn' onClick={managerClick}><p className='text'>Manager</p></div>
                    <div className='divBtn' onClick={adminClick}><p className='text'>Admin</p></div>
                </div>
            </div>
        </div>
    )
}

export default DecisionPage
