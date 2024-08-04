import { useState } from 'react'
import './App.css'
import Header from './components/Header';
import Footer from './components/Footer';
import Todos from './components/Todos';

function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <Header />
      <Todos />
      <Footer />
    </>
  )
}

export default App
