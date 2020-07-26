const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const appContainer = document.querySelector('main')

document.addEventListener("DOMContentLoaded", init)


  //INIT
function init(){
  fetch(TRAINERS_URL)
  .then(res => res.json())
    .then(json => {
      console.log(json)
      json.forEach(trainer => {
        const trainersCollection = document.createElement('div') //new div
        trainersCollection.innerHTML = renderTrainers(trainer) //set for render
        appContainer.appendChild(trainersCollection)//append trainers collection

        addPoke()
        //releasePoke()
       })
    })
}

          //REDNER TRAINERS
function renderTrainers(trainer){
  let content = `<div class=card data-id=${trainer.id}>
    <p>${trainer.name}</p>
    <button data-trainer-id=${trainer.id} class=add-pokemon-button >Add Pokemon</button>`

    trainer.pokemons.map(pokemon => {
      content += `<ul>
                <li>${pokemon.nickname} (${pokemon.species}) <button class="release" data-pokemon-id="${pokemon.id}">Release</button></li>
              </ul>`
    });

  content += '</div>'
  return content;
}

                  //ADD POKEMON
function addPoke(){
  const addPokemonButtons = document.querySelectorAll('.add-pokemon-button');

  addPokemonButtons.forEach(addPokemonButton => {
    addPokemonButton.addEventListener('click', (e) => {
      const trainerId = e.target.dataset.trainerId;

      return fetch(POKEMONS_URL, {
        method: "POST",
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          'trainer_id': trainerId
        })
      })
      .then(res => res.json())
      .then(res => {
        console.log('res from server', res);
        window.location.reload()
      })
      .catch(err => console.log('err from server', err))
    });
  })
}

           //DELETE POKEMON
appContainer.addEventListener('click', function(event) {
    if(event.target.className == "release"){
      fetch(POKEMONS_URL+`/${event.target.dataset.pokemonId}`,{
        method: "DELETE"
      })
     event.target.parentElement.remove()
    }
})
