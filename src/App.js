import './App.css';
import { useState } from 'react';
import { LC, NC, SC, UC } from './data/PassChar';

function App() {

  let [uppercase, setUppercase] = useState(false);
  let [lowercase, setLowercase] = useState(false);
  let [number, setNumber] = useState(false);
  let [symbols, setSymbols] = useState(false);
  let [passwordlen, setPasswordLen] = useState(10);
  let [fpass, setFpass] = useState('');
  let [isGenerated, setIsGenerated] = useState(false);  // Track if password was generated

  let createPassword = () => {
    let finalPass = '';
    let charSet = '';
    if (uppercase || lowercase || number || symbols) {
      if (uppercase) charSet += UC;
      if (lowercase) charSet += LC;
      if (number) charSet += NC;
      if (symbols) charSet += SC;
      
      for (let i = 0; i < passwordlen; i++) {
        finalPass += charSet.charAt(Math.floor(Math.random() * charSet.length));
      }
      setFpass(finalPass);
      setIsGenerated(true);  
    } else {
      alert("Please select at least 1 checkbox");
    }
  };

  let copyPass = () => {
    if (isGenerated) {  
      navigator.clipboard.writeText(fpass);
      alert("Password Copied");
    } else {
      alert("Please generate a password first");
    }
  };

  return (
    <>
      <div className='passwordBox'>
        <h2>Password Generator</h2>
        <div className='passwordBoxIn'>
          <input type='text' readOnly value={fpass} />
          <button onClick={copyPass}>Copy</button>
        </div>

        <div className='passLength'>
          <label>Password length</label>
          <input type='number' max={20} min={10} value={passwordlen} onChange={(event) => setPasswordLen(event.target.value)} />
        </div>

        <div className='passLength'>
          <label>Include uppercase letters</label>
          <input type='checkbox' checked={uppercase} onChange={() => setUppercase(!uppercase)} />
        </div>

        <div className='passLength'>
          <label>Include lowercase letters</label>
          <input type='checkbox' checked={lowercase} onChange={() => setLowercase(!lowercase)} />
        </div>

        <div className='passLength'>
          <label>Include numbers</label>
          <input type='checkbox' checked={number} onChange={() => setNumber(!number)} />
        </div>

        <div className='passLength'>
          <label>Include symbols</label>
          <input type='checkbox' checked={symbols} onChange={() => setSymbols(!symbols)} />
        </div>

        <button className='btn' onClick={createPassword}>
          Generate Password
        </button>
      </div>
    </>
  );
}

export default App;
