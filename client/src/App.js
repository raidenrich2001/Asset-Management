import './App.css';
import {Routes,Route} from 'react-router-dom'
import AddAsset from './components/AddAsset';
import Index from './components/Index';
import Login from './components/Login';
import SignUp from './components/SignUp';

function App() {
  return (
<>
<Routes>
  <Route path='/' element={<Login></Login>}></Route>
  <Route path='/signup/:name' element={<SignUp></SignUp>}></Route>
  <Route path='/:adminDashboard/:name' element={<Index></Index>}></Route>
  <Route path='/:userDashboard/:name' element={<Index></Index>}></Route>
  <Route path='/addAsset' element={<AddAsset></AddAsset>}></Route>
</Routes>
</>
);
}

export default App;
