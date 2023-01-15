import './App.css';
import {Routes, Route} from 'react-router-dom';

import DecisionPage from './pages/DecisionPage';
import ClientLoginPage from './pages/ClientLoginPage';
import ClientRegisterPage from './pages/ClientRegisterPage';
import ManagerLoginPage from './pages/ManagerLoginPage';
import ManagerRegisterPage from './pages/ManagerRegisterPage';
import AdminLoginPage from './pages/AdminLoginPage';
import ClientHomePage from "./pages/ClientHomePage";
import ReviewPage from './pages/ReviewPage';
import ManagerHomePage from './pages/ManagerHomePage';


function App() {
  return (
   <div className='App'>
      <Routes>
        <Route exact path="/" element={<DecisionPage />} ></Route>
        <Route exact path="/clientLoginPage" element={<ClientLoginPage />} />
        <Route exact path="/clientRegisterPage" element={<ClientRegisterPage />} />
        <Route exact path="/managerLoginPage" element={<ManagerLoginPage />} />
        <Route exact path="/managerRegisterPage" element={<ManagerRegisterPage />} />
        <Route exact path="/adminLoginPage" element={<AdminLoginPage />} />
        <Route exact path="/clientHomePage" element={<ClientHomePage/>} />
        <Route exact path='/reviewPage' element={<ReviewPage/>}/>
        <Route exact path='/managerHomePage' element={<ManagerHomePage/>}/>
      </Routes>
   </div>
  );
}

export default App;
