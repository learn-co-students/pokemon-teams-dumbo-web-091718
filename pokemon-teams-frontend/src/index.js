const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

const pokemonTeams = document.querySelector('main')


function init(){

    pokemonTeams.addEventListener('click', updateTeams)

    fetch(TRAINERS_URL)
    .then(res => res.json())
    .then(json => {
        json.forEach(trainer => renderTrainer(trainer))
    })
}

function renderTrainer(trainer){
    pokemonTeams.innerHTML += `<div class="card" data-id="${trainer.id}"><p>${trainer.name}</p>
    <button data-trainer-id="${trainer.id}">Add Pokemon</button>
    <ul>
    </ul>
  </div>`
//   debugger
    addPokemon(trainer)
}

function addPokemon(trainer){
    let trainerCard = pokemonTeams.querySelector(`div[data-id="${trainer.id}`)
    let pokemonContainer = trainerCard.children[2]
    // if(trainer.pokemons.trainer_id === trainer.id){
    for(pokemon of trainer.pokemons){
        pokemonContainer.innerHTML += `<li>${pokemon.nickname} (${pokemon.species}) <button class="release" data-pokemon-id="${pokemon.id}">Release</button></li>`
    }
}

function updateTeams(e){
    if(e.target.className === "release"){
        releasePokemon(e)
    } else if (e.target.innerHTML === "Add Pokemon"){
        newPokemon(e)
    }
}

function addNewPokemon(json){
    let pokemonTrainer = pokemonTeams.querySelector(`div[data-id="${json.trainer_id}`)
    console.log(json)
    pokemonTrainer.children[2].innerHTML += `<li>${json.nickname} (${json.species}) <button class="release" data-pokemon-id="${json.id}">Release</button></li>`
}

function newPokemon(e){
    console.log(e.target.parentElement)
    let id = e.target.parentElement.dataset.id
    fetch(POKEMONS_URL, {
        method: "POST", 
        headers: {
            "Content-Type": "application/json", 
        },
        body: JSON.stringify({trainer_id: id}), 
    })
    // debugger
    .then(res => res.json())
    .then(json => addNewPokemon(json))
}

function releasePokemon(e){
    e.preventDefault()
    let pokemonCard = e.target.parentElement
    let id = e.target.dataset.pokemonId
    pokemonCard.remove()
    fetch(`${POKEMONS_URL}/${id}`, {
        method: "DELETE"
    }).then(res => res.json())
}


init()