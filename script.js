const $users = document.getElementById('list')
let $url = ''

// pokemon API
async function fetchData(url) {

    const response = await fetch(url);
    const json = await response.json();
    $url = json.next

    displayPokemons(json.results);
  }
  
  fetchData('https://pokeapi.co/api/v2/pokemon/');

  
  function displayPokemons(pokemons) {
  
    const htmlTemplate = [];
    for (const pokemon of pokemons) {
  
   
      const $img = 'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/' + parseUrl(pokemon.url) + '.png'
  
      htmlTemplate.push(
        `
        <div class="pokecontainer">
        <img src="${$img}"><li>${pokemon.name}</li>
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
  
  const button = document.getElementById('load-more')

// using an anonymous function
    button.addEventListener('click', function () {
        fetchData($url)
        console.log(`The button was clicked`)
    })



  