import './style.css'

const API_URL = 'https://www.fruityvice.com/api/fruit/all'
const app = document.querySelector('#app')

app.innerHTML = `
  <div class="p-6 max-w-4xl mx-auto">
    <h1 class="text-3xl font-bold mb-6 text-center">
      Fruit API Project
    </h1>

    <div id="status" class="text-center mb-4"></div>

    <div
      id="fruit-list"
      class="grid gap-4 sm:grid-cols-2 md:grid-cols-3"
    ></div>
  </div>
`

const fruitList = document.querySelector('#fruit-list')
const statusMessage = document.querySelector('#status')

// ---------- RENDER ----------
function renderFruits(fruits) {
  fruitList.innerHTML = fruits
    .map(fruit => `
      <div class="border rounded-lg p-4 shadow-sm">
        <h2 class="text-xl font-semibold mb-2">${fruit.name}</h2>
        <ul class="text-sm text-gray-700">
          <li>Calories: ${fruit.nutritions.calories}</li>
          <li>Sugar: ${fruit.nutritions.sugar}</li>
          <li>Carbs: ${fruit.nutritions.carbohydrates}</li>
        </ul>
      </div>
    `)
    .join('')
}

// ---------- FETCH ----------
async function getAllFruits() {
  try {
    statusMessage.textContent = 'Loading fruits...'

    const response = await fetch(API_URL) 
    console.log()

    if (!response.ok) {
      throw new Error(`HTTP Error: ${response.status}`)
    }

    const data = await response.json()

    statusMessage.textContent = ''
    renderFruits(data)

  } catch (error) {
    statusMessage.textContent = 'Failed to load fruit data.'
    statusMessage.className = 'text-red-500 text-center'
    console.error(error)
  }
}

// ---------- INIT ----------
getAllFruits()

  

