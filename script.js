//display 20 pokemons
const $users = document.getElementById('list')
let $next = ''
let $previous = ''

// parseURL
// Will return the pokemon's id from the provided url
function parseUrl (url) {
  return url.substring(url.substring(0, url.length - 2).lastIndexOf('/') + 1, url.length - 1)
}

// pokemon API
async function fetchData(url) {

    const response = await fetch(url);
    const json = await response.json();
    $next = json.next
    $previous = json.previous

    displayPokemons(json.results);
  }
  
fetchData('https://pokeapi.co/api/v2/pokemon/');
  
//display pokemon's image and name
  function displayPokemons(pokemons) {
  
    const htmlTemplate = [];
    for (const pokemon of pokemons) {
  
      const $img = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/' + parseUrl(pokemon.url) + '.png'
      const $id = parseUrl(pokemon.url)
  
      htmlTemplate.push(
        `
        <div class="pokecontainer">
        <img src="${$img}" data-id="${$id}" data-url="${$img}" data-name="${pokemon.name}"><li>${pokemon.name}</li>
        </div>
        `
        );
    }
  
    $users.innerHTML = htmlTemplate.join('');
  }

  //add event listner
  
  const nextButton = document.getElementById('next')

// using an anonymous function
    nextButton.addEventListener('click', function () {
        fetchData($next)
    })

    const previousButton = document.getElementById('previous')

// using an anonymous function
    previousButton.addEventListener('click', function () {
        fetchData($previous)
        // console.log(`The button was clicked`)
    })

//display pokemon's abilities
//adds interactive scripts

const $displayPokemon = document.querySelectorAll('#pokemon')
const $screen = document.getElementById('display')

//fetch abilities data
async function fetchAbilityName(id, name) {

  const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`);
  const json = await response.json();
  const imgUrl = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/' + id + '.png'
  const abilities = json.abilities
  const details = []

  details.push(`
    
    <div class="display-text">
      <h3 class="px-2 bg-danger text-light text-uppercase">${name}</h3>
    </div>
    <div class="display-image">
      <img src="${imgUrl}" alt="Pokemon">
    </div>
    <div class="display-text">
      <h4 class="abilities">Abilities:</h4>
      <ul>
  `)

  for(const pokemon of abilities){
    details.push(`<li>${pokemon.ability.name}</li>`)
  }

  details.push(`
  </ul>
  </div>`)

  $screen.innerHTML = details.join('')
  
  selectPokemon.setAttribute('data-name', name)
  selectPokemon.setAttribute('data-poke-id', id)
  
}

//adds interactive scripts

document.getElementById('list').addEventListener('click', function (e) {
  if (e.target.tagName.toLowerCase() === 'img') {

    const imgName = e.target.dataset.name
    fetchAbilityName(e.target.dataset.id, imgName)

  }
}, false);

//event listener to the select button
//add pokemon to the selected list
// Get the selected Pokemon array from local storage when the page loads
document.addEventListener('DOMContentLoaded', function () {
  const selectedPokemonsString = localStorage.getItem('selectedPokemons');
  if (selectedPokemonsString) {
    const selectedPokemons = JSON.parse(selectedPokemonsString);
    displaySelected(selectedPokemons);
  }
});

// Event listener to the select button
// Add Pokemon to the selected list
const selectPokemon = document.getElementById('selectbutton');
const selectedPokemon = document.getElementById('selectedpokemon');

selectPokemon.addEventListener('click', function (e) {
  const selectedName = e.target.dataset.name;
  const imgUrl = `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${e.target.dataset.pokeId}.png`;
  const imgName = e.target.dataset.name;

  // Retrieve the selected Pokemon array from local storage
  const selectedPokemonsString = localStorage.getItem('selectedPokemons');
  let selectedPokemons = [];
  if (selectedPokemonsString) {
    selectedPokemons = JSON.parse(selectedPokemonsString);
  }

  // Add the new selected Pokemon to the array
  const pokemon = { name: imgName, imgUrl: imgUrl };
  selectedPokemons.push(pokemon);

  // Store the updated selected Pokemon array in local storage
  localStorage.setItem('selectedPokemons', JSON.stringify(selectedPokemons));

  displaySelected(selectedPokemons);
});

// Display the selected Pokemon
function displaySelected(selectedPokemons) {
  const htmlTemplate = [];
  for (const pokemon of selectedPokemons) {
    htmlTemplate.push(`
      <div class="selectedlist">
        <img src="${pokemon.imgUrl}" alt="Pokemon">
        <p>${pokemon.name}</p>
      </div>
    `);
  }

  selectedPokemon.innerHTML = htmlTemplate.join('');
}



  