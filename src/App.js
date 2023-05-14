import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import InputForm from './components/InputForm';
import useFetch from './Hooks/useFetch';
import DisplayDetails from './components/DisplayDetails';
import Landing from './components/Landing';
import HybridEncryptionDemo from './components/HybridEncyptionDemo';

function App() {
  const {data:encryptionKeys } = useFetch("http://localhost:8000/encryptionKeys")
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path='/' element={<Landing/>}/>
          <Route path='/InputForm' element={<HybridEncryptionDemo encryptionKeys={encryptionKeys}/>} />
          <Route path='/DisplayDetails' element={<DisplayDetails encryptionKeys={encryptionKeys}/>} />
          <Route path="/demo" element={<HybridEncryptionDemo/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
