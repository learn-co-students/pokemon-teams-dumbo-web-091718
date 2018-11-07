const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const main = document.querySelector('main')


// Gets Trainers and converts them to JSON.
const getTrainers = function () {
    return fetch(TRAINERS_URL)
    .then(function(response){
        return response.json()
    })
}


// Appending trainers to the main HTML tag.
const appendTrainer = function (trainer){

let trainerCard
let trainerPokes = ""

trainer.pokemons.forEach( (pokemon) => {
  trainerPokes += `<li>${pokemon.nickname} (${pokemon.species}) <button class="release" data-pokemon-id="${pokemon.id}">Release</button></li> \n`
 })

 trainerCard = `<div class="card" data-id="${trainer.id}"><p>${trainer.name}</p>
   <button class="addPoke" data-trainer-id="${trainer.id}">Add Pokemon</button>
   <ul>
     ${trainerPokes}
   </ul>
 </div>`;
 // debugger
 main.innerHTML += trainerCard
}   


// Creatin of rendering trainers to the page.
const renderTrainers = function (){
    getTrainers().then(function(json){
        main.innerHTML = ""
        json.forEach(function(trainer){
            // console.log(trainer);
            
            appendTrainer(trainer)
        })
    })
}


renderTrainers() // Rendering Trainers to the page.


main.addEventListener('click', function(event){
    // console.log(event.target);
    event.preventDefault()
    let pokeId = parseInt(event.target.dataset.pokemonId)
    let trainerId = event.target.dataset.trainerId
    console.log(pokeId);
    
    // debugger
    if(event.target.className === "release"){
        // console.log('got the release')
        fetch(`${POKEMONS_URL}/${pokeId}`,{
            headers: { 
                'Content-Type': 'application/json'
              },
            method: 'DELETE',
        }).then(function(){
            renderTrainers()
        })
    }else if (event.target.className === "addPoke") {
        console.log('got the add')
        
        fetch(`${POKEMONS_URL}`,{
            headers: { 
                'Content-Type': 'application/json'ß
              },
            method: 'POST',
            body: JSON.stringify({
                trainer_id: trainerId
            })
        }).then(function(){
            renderTrainers()
        })
    }
})