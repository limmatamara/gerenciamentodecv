import { useEffect } from 'react';
import './App.css';
import Routers from './routers';

function App() {
  useEffect(() => {
    document.title = "Gerenciamento CV"
  }, []);
  return (
    <Routers/>
  );
}

export default App;
