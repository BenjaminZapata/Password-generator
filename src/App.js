import { useState } from 'react';
import { numbers, upperCaseLetters, lowerCaseLetters, symbols } from './Characters';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import './App.scss';

function App() {
  const [password, setPassword] = useState('')
  const [passwordLength, setPasswordLength] = useState(8)
  const [includeUppercase, setIncludeUppercase] = useState(false)
  const [includeLowercase, setIncludeLowercase] = useState(false)
  const [includeNumbers, setIncludeNumbers] = useState(false)
  const [includeSymbols, setIncludeSymbols] = useState(false)

  const handlePasswordGenerator = () =>{
    if (!includeUppercase && !includeLowercase && !includeNumbers && !includeSymbols){
      notify('error', 'Debes seleccionar al menos un checkbox')
      return;
    }
    let characterList = ''
    if (includeUppercase){
      characterList = characterList + upperCaseLetters
    }
    if (includeLowercase){
      characterList = characterList + lowerCaseLetters
    }
    if (includeNumbers){
      characterList = characterList + numbers
    }
    if (includeSymbols){
      characterList = characterList + symbols
    }
    passwordGenerator(characterList, passwordLength)
  }

  const passwordGenerator = (characterList, length) =>{
    let newPassword = '';
    for (let i = 0; i < length; i++){
      let index = Math.floor(Math.random() * characterList.length)
      newPassword = newPassword + characterList.charAt(index);
    }
    setPassword(newPassword)
  }

  const copyToClipboard = () => {
    navigator.clipboard.writeText(password)
    notify('info', 'Contraseña copiada')
  }

  const notify = (type, msg) => {
    if (type === 'error'){
      toast.error(msg, {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    } else{
      toast.info(msg, {
        position: "bottom-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      })
    }
  }

  return (
    <div className="App">
      <h1 className='title'>generador de contraseñas</h1>
      <header>
        <p>{password}</p>
        <button><img src='/assets/icons/copy-to-clipboard.png' alt='Copy to clipboard' onClick={copyToClipboard}/></button>
      </header>
      <footer>
        <div>
          <label htmlFor='length'>Longitud ({passwordLength})</label><input type="range" value={passwordLength} min="8" max="26" className="slider" id="longitud" name='length' onChange={(e) => setPasswordLength(e.target.value)}></input>
        </div>
        <div>
          <label htmlFor='uppercase'>Utilizar mayusculas</label><input type='checkbox' name='uppercase' checked={includeUppercase} onChange={(e) => setIncludeUppercase(e.target.checked)}></input>
        </div>
        <div>
          <label htmlFor='lowercase'>Utilizar minusculas</label><input type='checkbox' name='lowercase' checked={includeLowercase} onChange={(e) => setIncludeLowercase(e.target.checked)}></input>
        </div>
        <div>
          <label htmlFor='numbers'>Incluir numeros</label><input type='checkbox' name='numbers' checked={includeNumbers} onChange={(e) => setIncludeNumbers(e.target.checked)}></input>
        </div>
        <div>
          <label htmlFor='symbols'>Incluir simbolos</label><input type='checkbox' name='symbols' checked={includeSymbols} onChange={(e) => setIncludeSymbols(e.target.checked)}></input>
        </div>
        <button className='generate' onClick={handlePasswordGenerator}>Generar contraseña</button>
      </footer>
      <ToastContainer />
    </div>
  );
}

export default App;
