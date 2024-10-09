import 'bootstrap/dist/css/bootstrap.min.css';
import {
  BrowserRouter as Router, Routes, Route,
} from 'react-router-dom';

import './App.css';
import Login from './page/Login';


const App =()=> {
  return(
    <div className='app'>
      <Router>
        <Routes>

          <Route path="/login"element={<Login/>}/>
        </Routes>
      </Router>

    </div>
  );
}
export default App;