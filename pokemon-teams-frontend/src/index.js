const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

window.addEventListener('load', init)

const mainCon = document.querySelector('main')


function init() {

  mainCon.addEventListener('click', updateTeam)

  fetch(TRAINERS_URL)
  .then(res => res.json())
  .then(json => json.forEach(team => {
    renderTeam(team)
    renderPokemon(team)
  }))
}

function renderTeam(team) {
  mainCon.innerHTML += `<div class="card" data-id="${team.id}"><p>${team.name}</p>
  <button data-trainer-id="${team.id}">Add Pokemon</button>
  <ul>
  </ul>
  </div>`
}

function renderPokemon(team) {
  let ulTag = mainCon.lastElementChild.lastElementChild
  team.pokemons.forEach(pokeObj => {
    ulTag.innerHTML += `<li>${pokeObj.nickname} (${pokeObj.species}) <button class="release" data-pokemon-id="${pokeObj.id}">Release</button></li>`
  })
}

function updateTeam(event) {
  if (event.target.innerText === 'Add Pokemon' && event.target.parentElement.lastElementChild.childElementCount < 6) {
    addNewPokemon(event)
  } else if (event.target.innerText === 'Release') {
    releasePokemon(event)
  }
}

function addNewPokemon(event) {
  let ulTag = mainCon.lastElementChild.lastElementChild
  let trainerID = event.target.parentElement.dataset.id

  fetch(POKEMONS_URL, {
    method: 'POST',
    headers:
    {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      trainer_id: trainerID
    })
  })
  .then(res => res.json())
  .then(function(json) {
    ulTag.innerHTML += `<li>${json.nickname} (${json.species}) <button class="release" data-pokemon-id="${json.id}">Release</button></li>`
  })
}

function releasePokemon(event) {
  // debugger
  let pokeID = event.target.dataset.pokemonId
  event.target.parentElement.remove()

  fetch(`${POKEMONS_URL}/${pokeID}`, {
    method: 'DELETE'
  })
}
