const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const main = document.querySelector('main')

window.addEventListener("load", function(event){
  renderTeams()
})

main.addEventListener("click", function(event){
  if (event.target.innerText === "Add Pokemon" && event.target.parentElement.lastElementChild.children.length < 6){
    addPokemon(event)
  } else if (event.target.innerText === "Add Pokemon" && event.target.parentElement.lastElementChild.children.length >= 6){
    alert("You have a full team!")
  } else if (event.target.innerText === "Release") {
    deletePokemon(event)
    event.target.parentElement.remove()
  }
})

function renderTeams(){
  fetch(TRAINERS_URL).then(function(response){
    return response.json()
  }).then(function(json){
    main.innerHTML = ""
    json.forEach(team => {
      main.innerHTML += `<div class="card" data-id="${team.id}"><p>${team.name}</p>
        <button data-trainer-id="${team.id}">Add Pokemon</button>
        <ul>
        </ul>
      </div>`
      team.pokemons.forEach(pokemon => {
        main.lastElementChild.lastElementChild.innerHTML += `<li>${pokemon.nickname} (${pokemon.species}) <button class="release" data-pokemon-id="${pokemon.id}">Release</button></li>`
      })
    })
  })
}

function addPokemon(e){
  id = event.target.dataset.trainerId

  fetch(POKEMONS_URL, {
    method: "POST",
    headers: {
      "Content-Type": 'application/json'
    },
    body: JSON.stringify({
      trainer_id: id
    })
  }).then(function(){
    renderTeams()
  })
}

function deletePokemon(e){
  id = event.target.dataset.pokemonId
  fetch(`${POKEMONS_URL}/${id}`, {
    method: "DELETE"
  })
}
