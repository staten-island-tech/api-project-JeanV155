import './style.css'

const API_URL = 'https://www.fruityvice.com/api/fruit/all'

const app = document.querySelector('#app')

app.innerHTML = `
  <div class="p-6 max-w-5xl mx-auto">
    <h1 class="text-3xl font-bold mb-6 text-center">
      Fruityvice API Project 
    </h1>

    <div id="status" class="text-center mb-4"></div>

    <div
      id="fruit-cards"
      class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6"
    ></div>
  </div>
`

const cards = document.querySelector('#fruit-cards')
const statusMessage = document.querySelector('#status')

function renderFruits(fruits) {
  cards.innerHTML = fruits
    .map(
      (fruit) => `
        <div class="border rounded-lg p-5 shadow-sm text-center">
          <h2 class="text-xl font-bold mb-2">
            ${fruit.name}
          </h2>

          <ul class="text-sm text-gray-700 space-y-1">
            <li><strong>Family:</strong> ${fruit.family}</li>
            <li><strong>Order:</strong> ${fruit.order}</li>
            <li><strong>Genus:</strong> ${fruit.genus}</li>
            <li><strong>Calories:</strong> ${fruit.nutritions.calories}</li>
            <li><strong>Sugar:</strong> ${fruit.nutritions.sugar}g</li>
          </ul>
        </div>
      `
    )
    .join('')
}

async function getFruits() {
  try {
    statusMessage.textContent = 'Loading fruits...'
    statusMessage.className = 'text-gray-500 text-center'

    const response = await fetch(API_URL)

    if (!response.ok) {
      throw new Error(`HTTP error: ${response.status}`)
    }

    const fruits = await response.json()

    statusMessage.textContent = ''
    renderFruits(fruits)
  } catch (error) {
    statusMessage.textContent = 'Failed to load fruit data.'
    statusMessage.className = 'text-red-500 text-center'
    console.error(error)
  }
}

getFruits()





