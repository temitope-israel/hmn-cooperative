import {Routes, Route} from 'react-router-dom';
import LoginPage from '@/pages/auth/LoginPage';
import RegisterPage from '@/pages/auth/RegisterPage';
import PendingApprovalPage from '@/pages/auth/PendingApprovalPage';
import DashboardPage from '@/pages/dashboard/DashboardPage';


function App (){
  return (
   <Routes>
    {/* Redirect root URL to /login */}
    <Route path='/login' element={<LoginPage/>}/>
    <Route path="/register" element={<RegisterPage/>}/>
    <Route path="/pending-approval" element={<PendingApprovalPage/>}/>


    {/* Protected Pages  */}
    <Route path="/dashboard" element={<DashboardPage/>}/>
   </Routes>
  )
}

export default App;