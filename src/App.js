import './App.css';
import {Routes,Route} from "react-router-dom";
import Home from './components/Home';
import Details from './components/Details';
function App() {
  return (
    <Routes>
      <Route path='/' element={<Home/>}/>
      <Route path='/users' element={<Home/>}/>
      <Route path ="/users/:id" element={<Details/>}/>

    </Routes>
  );
}

export default App;
