import logo from '../../src/logo.svg';
import { Link } from 'react-router-dom';

const Landing = () => {
  return (
    <div>
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Cloud Computing Project<br></br>Hybrid Encryption & Decryption methods for safer data storage in the cloud
        </p>
        <br></br>
        <Link to="/InputForm">
            <button className='text-lg max-h-[50px] max-w-[200px] font-semibold mt-4 lg:mt-0 lg:ml-8 border border-gray-500/25 p-2 mx-4 bg-indigo-700 hover:bg-indigo-600 text-white transition-all ease-in-out active:scale-95 rounded-sm'>Input Form</button>
        </Link>
        <br />
        <Link to="/DisplayDetails">
            <button className='text-lg max-h-[50px] max-w-[200px] font-semibold mt-4 lg:mt-0 lg:ml-8 border border-gray-500/25 p-2 mx-4 bg-indigo-700 hover:bg-indigo-600 text-white transition-all ease-in-out active:scale-95 rounded-sm'>Display Contents</button>
        </Link>
      </header>
    </div>
  );
};

export default Landing;
