const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`

document.addEventListener('DOMContentLoaded', function() {

  fetch(TRAINERS_URL)
  .then(function(res){
    return res.json()
  })
  .then(function(json){

    let card = document.querySelector('main')
    json.forEach(function(trainer){

      card.innerHTML += `<div class="card" data-id="${trainer.id}"><p>${trainer.name}</p>
        <button class="like-btn" data-trainer-id="${trainer.id}">Add Pokemon</button>`
        // debugger
        for (let pokemon of trainer.pokemons){
          let cardId = document.querySelector(`.card[data-id="${pokemon.trainer_id}"]`)

          cardId.innerHTML += ` <li>${pokemon.nickname} (${pokemon.species}) <button class="release" data-pokemon-id="${pokemon.id}">Release</button></li>`
        }

    })

    card.addEventListener('click', function(event){
      if (event.target.className === "like-btn") {
        let id = parseInt(event.target.dataset.trainerId)
        // debugger
        fetch(POKEMONS_URL, {
          method: "POST",

          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            trainer_id: id
          })
        })
        .then(function(res){
          return res.json()
        })
        .then(function(pokemon) {
          let cardId = document.querySelector(`.card[data-id="${pokemon.trainer_id}"]`)
          card.innerHTML += ` <li>${pokemon.nickname} (${pokemon.species}) <button class="release" data-pokemon-id="${pokemon.id}">Release</button></li>`
        })
      }

      if (event.target.className === "release") {
        // debugger
        let pokeId = parseInt(event.target.dataset.pokemonId)
        let li = event.target.parentElement
        li.remove()

        fetch(POKEMONS_URL + `/${pokeId}`, {
          method: "DELETE",
        })


      }
    })
  })


})
