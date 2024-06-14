import { TbMapSearch } from 'react-icons/tb'
import './styles.css'
import { useState } from 'react'
import api from './services/api'

function App() {

  const [input, setInput] = useState()
  const [cep, setCep] = useState({})

  async function handleSearch(){
    if(input === ""){
      alert("Digite um cep")
      return;
    }
    try{
      const response = await api.get(`${input}/json`)
      setCep(response.data)
      setInput("")

    }catch{
      alert("Ops... erro ao buscar CEP")
      setInput("")
    }
  }

  return (
    <div className="container">
    <div className="title"> <h1>Search Location</h1></div>
    <div className="containerInput">
      <input placeholder="Enter a cep..." value={input} onChange={(e) => setInput(e.target.value)}
      />
      <button className="btnInput" onClick={handleSearch}> <TbMapSearch size={25} color='#fff'/> </button>
    </div>

    {Object.keys(cep).length > 0 && (
      <main className='main'>
      <h2>CEP: {cep.cep}</h2>

      <span>Rua: {cep.logradouro}</span>
      <span>Num: {cep.complemento}</span>
      <span>Bairro: {cep.bairro}</span>
      <span>Cidade: {cep.localidade}</span>
    </main>
    )}
    
</div>
  );
}



export default App;
