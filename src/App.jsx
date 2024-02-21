import { useState } from 'react'
import { useEffect } from 'react'
import './App.css'

function App() {
const [catImageUrl, setCatImageUrl] = useState('')
const [fact, setFact] = useState('')

useEffect(() => {
  (async () => {
    try {
      const response = await fetch('https://catfact.ninja/fact');
      const data = await response.json();
      const { fact } = data;
      setFact(fact);
    } catch (error) {
      console.error(error);
    }
  })(); 
}, []);

useEffect(() => {
  if(fact){
    (
      async() => {
        try {
          const firstWord = fact.split(' ',3).join(' ')
          const response = await fetch(`https://cataas.com/cat/says/${firstWord}`)
          const data = await response
          const {url} = data
          setCatImageUrl(url)
        }catch(error) {
          console.error(error)
        }
      }
    )()
  }
}, [fact])

return (
  <div className="container">
  <h1 className="title">useState, useEffect example: random cat</h1>
  {fact && <p className="fact">{fact}</p>}
  {catImageUrl && (
    <img
      className="cat-image"
      src={catImageUrl}
      alt="random cat"
    />
  )}
</div>
);
}

export default App
