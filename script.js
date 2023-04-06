//display 20 pokemons
const $users = document.getElementById('list')
let $next = ''
let $previous = ''

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
        <img src="${$img}" data-id="${$id}" data-url="${$img}" ><li>${pokemon.name}</li>
        </div>
        `
        );
    }
  
    $users.innerHTML = htmlTemplate.join('');
  }

  // parseURL
  // Will return the pokemon's id from the provided url
  function parseUrl (url) {
    return url.substring(url.substring(0, url.length - 2).lastIndexOf('/') + 1, url.length - 1)
  }

  //add event listner
  
  const nextButton = document.getElementById('next')

// using an anonymous function
    nextButton.addEventListener('click', function () {
        fetchData($next)
        // console.log(`The button was clicked`)
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

document.getElementById('list').addEventListener('click', function (e) {
  if (e.target.tagName.toLowerCase() === 'img') {

    const imgUrl = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/' + e.target.dataset.id + '.png'

    $screen.innerHTML = `
      <div class="display-image">
        <img src="${imgUrl}" alt="Pokemon">
      </div>
      <div class="display-text">
        <h3 class="pt-4 pb-2">testing testing</h3>
      </div>
    `;
  }
}, false);




// const $displayPokemon = document.getElementById('pokemon')
// const $screen = document.getElementById('display')

// for (let i = 0; i < 20; i++) {
//     $displayPokemon[i].addEventListener('click', function () {
//         $screen.innerHTML = `
//         <p>Testing Testing</p>`
//     })
    
//   }


  