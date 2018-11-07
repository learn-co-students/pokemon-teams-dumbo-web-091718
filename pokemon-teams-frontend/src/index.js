const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

const pokemonContainer = document.querySelector('main')
const pokemonCardContainer = document.querySelector('.card')
const ulTag = document.querySelector('ul')

fetch(TRAINERS_URL)
  .then(response => response.json())
  .then(json => {

    json.forEach(trainer => {

      pokemonContainer.innerHTML += `<div class="card" data-id="${trainer.id}"><p>${trainer.name}</p>
  <button data-id="${trainer.id}" class="add">Add Pokemon</button>
  <ul>
    ${trainer.pokemons.map(pokemon => {
      return `<li>${pokemon.nickname} (${pokemon.species}) <button class="release" data-pokemon-id="${pokemon.id}">Release</button></li>`
    }).join('')}
 </ul>
</div>`
  })

})

pokemonContainer.addEventListener('click', event => {

  let trainerId = event.target.dataset.id
  let pokeId = event.target.dataset.pokemonId

  if (event.target.className === 'add') {
    let ulChildren = event.target.nextElementSibling.children.length

    if (ulChildren < 6) {

      fetch(POKEMONS_URL, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accepts': 'application/json'
        },
        body: JSON.stringify( {
          trainer_id: trainerId
        })
      })
      .then(response => response.json())
      .then( json => {
        event.target.nextElementSibling.innerHTML += `<li> ${json.nickname} (${json.species}) <button class="release" data-pokemon-id="${json.id}">Release</button></li>`
      })
    }
  }

    if (event.target.className === 'release') {
      // debugger
      event.target.parentElement.remove()


    fetch(`${POKEMONS_URL}/${pokeId}`, {
      method: 'DELETE'
    })

}
})
