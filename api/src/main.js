import './style.css'
import javascriptLogo from './javascript.svg'
import viteLogo from '/vite.svg'
import { setupCounter } from './counter.js'

const api = await fetch ("https://www.fruityvice.com/api/fruit/all")
const apidata = await api.json()
console.log(apidata)
document.querySelector('#app').innerHTML = `
  <div>
    <a href="https://vite.dev" target="_blank">
      <img src="${viteLogo}" class="logo" alt="Vite logo" />
    </a>
    <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript" target="_blank">
      <img src="${javascriptLogo}" class="logo vanilla" alt="JavaScript logo" />
    </a>
    <h1>Hello Vite!</h1>
    <div class="card">
      <button id="counter" type="button"></button>
    </div>
    <p class="read-the-docs">
      Click on the Vite logo to learn more
    </p>
  </div>
`

setupCounter(document.querySelector('#counter')) 

async function  getAlldata() {
  try {
    const response = await fetch ("https://www.fruityvice.com/api/fruit/all")
    if (response.status != 200) {
      throw new Error (response)
    } else {
      const data = await response.json 
      data.cards.forEach((cards)
        
      });
    }
    
  } catch (error) {
    
  }

}
  

