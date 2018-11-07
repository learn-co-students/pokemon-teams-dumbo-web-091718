document.addEventListener('DOMContentLoaded',function(){
const BASE_URL = "http://localhost:3000"
const TRAINERS_URL = `${BASE_URL}/trainers`
const POKEMONS_URL = `${BASE_URL}/pokemons`
const main = document.querySelector('main')

fetch(TRAINERS_URL)
  .then(res=>res.json())
  .then(json=>{
    json.forEach(trainer=>{
        main.innerHTML+=`<div class="card" data-id="${trainer.id}"><p>${trainer.name}</p>
        <button data-trainer-id="${trainer.id}">Add Pokemon</button>
      <ul>
      `
      trainer.pokemons.forEach(pokemon=>{
        let ul = document.querySelector(`[data-id="${trainer.id}"] ul`)
        // let ul = card.querySelector('ul')
        ul.innerHTML+=`
          <li>${pokemon.nickname} (${pokemon.species})<button class="release" data-pokemon-id="${pokemon.id}">Release</button></li>
      `
    })
    main.innerHTML+='</ul></div>'
    })
    // console.log(json)
  })

  main.addEventListener('click',(event)=>{
    if (event.target.hasAttribute('data-trainer-id')){
      fetch(POKEMONS_URL, {
    method: "POST",
    headers: {
      'Accepts': 'application/json',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      'trainer_id': event.target.getAttribute('data-trainer-id')
    })
  })
  .then(res=>res.json())
  .then(
    json=>{
      let ul = document.querySelector(`[data-id="${json.trainer_id}"] ul`)
    ul.innerHTML+=`
      <li>${json.nickname} (${json.species})<button class="release" data-pokemon-id="${json.id}">Release</button></li>
  `
})
}
if (event.target.className==='release'){
  let id = event.target.getAttribute('data-pokemon-id')
  event.target.parentElement.remove()
  fetch(`${POKEMONS_URL}/${id}`, {
method: "DELETE"
})
}
})

})
