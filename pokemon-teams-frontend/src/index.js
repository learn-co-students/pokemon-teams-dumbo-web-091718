const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
document.addEventListener("DOMContentLoaded", init)
const main = document.querySelector('main')

/// add and delete fetch function
function updateTrainerPokemon(doThing, body, pokeId = null) {
  if (doThing === 'POST') {
    url = POKEMONS_URL
  } else {
    url = POKEMONS_URL +`/${pokeId}`
  }
  fetch(url, {
    method: doThing,
    headers: {
      'Content-Type' : 'application/json'
    },
    body: JSON.stringify(body)
  })
  .then(response => response.json())
  .then(init)
}

/// button event listerners
window.addEventListener("click", (event)=>{
  if (event.target.className === "add-poke") {
    let method = 'POST'
    let trainerId = parseInt(event.target.dataset.trainerId)
    let body = {trainer_id: trainerId}
    if (event.target.parentElement.children.length >= 9) {
      alert("Your poke card is maxxed out!")
    } else {
      updateTrainerPokemon(method, body)
    }
  }
  if (event.target.className === "release") {
    let method = 'DELETE'
    let pokemonId = parseInt(event.target.dataset.pokemonId)
    let body = {}
    updateTrainerPokemon(method, body, pokemonId)
  }
})

/// output trainers and pokes to page
function showTrainers(arr) {
  main.innerHTML = ""
  for (trainers of arr) {
    let trainer = document.createElement('div')
    trainer.className = "card"
    trainer.dataset = trainers["id"]
    trainer.innerHTML =`<p>${trainers["name"]}</p>
  <button class="add-poke" data-trainer-id="${trainers["id"]}">Add Pokemon</button>
  <ul>`
    for(poke of trainers.pokemons) {
      trainer.innerHTML +=  `<li>${poke["nickname"]} (${poke["species"]}) <button class="release" data-pokemon-id="${poke["id"]}">Release</button></li>`
    }
    trainer.innerHTML += `</ul>`
    main.appendChild(trainer)
  }
}

/// trainer function fetch on load
function init() {
  fetch(TRAINERS_URL)
  .then(function(response){
    return response.json()
  })
  .then(function(trainersJson) {
    showTrainers(trainersJson)
  })
}
